import { Mongo } from 'meteor/mongo';

export const Patients = new Mongo.Collection('patients');
export const Trials = new Mongo.Collection('trials');
