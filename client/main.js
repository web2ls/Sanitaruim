import { Template } from 'meteor/templating';
import { Patients, Trials } from '../lib/collections';

Template.patientList.helpers({
  patients() {
    return Patients.find({});
  }
});

Template.patient.events({
  'click .delete-patient-btn'() {
    Patients.remove(this._id);
  },

  'click .show-more-info-btn'(event) {
    const parent = $(event.target).parent();
    const grandParent = $(event.target).parent().parent();

    if ((grandParent).hasClass('open')) {
      $(parent).next().hide();
      $(grandParent).removeClass('open');
    } else {
      $(parent).next().show();
      $(grandParent).addClass('open');
    }
  },

  'click .show-trials-btn'() {
    const trialPath = '/trials/' + this._id;
    FlowRouter.go(trialPath);
  }
});

Template.newPatientModal.events({
  'submit form'(event) {
    event.preventDefault();
    const target = event.target;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const sex = target.chooseSex.value;
    const age = target.age.value;

    const newPatient = {
      firstName,
      lastName,
      sex,
      age,
      createdAt: new Date()
    };

    Patients.insert(newPatient);

    target.firstName.value = '';
    target.lastName.value = '';
    target.chooseSex.value = '';
    target.age.value = '';

    $('#new-patient-modal').modal('close');

    return false
  }
});

Template.trialList.helpers({
  trials: function() {
    const currentPatient = FlowRouter.getParam("patientId");
    return Trials.find({patientId: currentPatient});
  }
});

Template.trialList.events({
  'click .back-to-patients-btn'() {
    FlowRouter.go('/');
  }
});

Template.trialPreview.events({
  'click .delete-trial-btn'() {
    Trials.remove(this._id);
  },

  'click .edit-trial-btn'() {
    const trialPath = '/trials/trial/' + this._id;
    FlowRouter.go(trialPath);
  }
});

Template.newTrialModal.events({
  'submit form'(event) {
    event.preventDefault();
    const target = event.target;
    const trialName = target.trialName.value;
    const trialPatient = target.trialPatient.value;
    const trialConclusion = target.trialConclusion.value;
    const trialType = [];
    const checkedElement = $(event.target).find('input[type=checkbox]:checked');
    $.each(checkedElement, function(i, item) {
      trialType.push(item.value);
    });


    const newTrial = {
      trialName,
      trialPatient,
      trialConclusion,
      trialType,
      createdAt: new Date(),
      patientId: FlowRouter.getParam("patientId")
    };

    Trials.insert(newTrial);

    target.trialName.value = '';
    target.trialPatient.value = '';
    target.trialConclusion.value = '';

    $('#new-trial-modal').modal('close');

    return false
  }
});

Template.editTrial.helpers({
  currentTrial() {
    return Trials.findOne({_id: FlowRouter.getParam("trialId")});
  }
});

Template.editTrial.events({
  'click .back-to-trials-btn'() {
    history.back();
  },

  'submit .edit-trial-form'(event) {
    event.preventDefault();
    const target = event.target;
    const trialName = target.trialName.value;
    const trialPatient = target.trialPatient.value;
    const trialConclusion = target.trialConclusion.value;

    const updatedTrial = {
      trialName,
      trialPatient,
      trialConclusion
    };

    const currentTrialId = FlowRouter.getParam('trialId');
    Trials.update(
      {_id: currentTrialId},
        {$set: {
          trialName: trialName,
          trialPatient: trialPatient,
          trialConclusion: trialConclusion
        }
      }
    );

    target.trialName.value = '';
    target.trialPatient.value = '';
    target.trialConclusion.value = '';

    history.back();

    return false
  }
})

$(document).ready(function() {
  $('#new-patient-modal').modal();
  $('#new-trial-modal').modal();

  $('select.choose-sex').material_select();
});
