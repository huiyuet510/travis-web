import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['settings-cron'],
  isDeleting: false,
  actionType: 'Save',
  store: Ember.inject.service(),

  disable_by_build: function(key) {
    var value = '';
    if (this.get('cron.disable_by_build')) {
      value = 'Only ';
    } else {
      value = 'Even ';
    }
    return value + 'if no new commit after last cron build';
  }.property('cron.disable_by_build'),

  actions: {
    "delete": function() {
      if (this.get('isDeleting')) {
        return;
      }
      this.set('isDeleting', true);
      return this.get('store').findRecord('cron', this.get('cron.id')).then(function(cron) {
        return cron.destroyRecord();
      });
    }
  }
});
