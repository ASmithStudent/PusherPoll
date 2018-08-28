const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Vote = require('../Models/Vote')

const Pusher = require('pusher')

var pusher = new Pusher({
  appId: '585863',
  key: 'fb1308924093e4543a6f',
  secret: 'fb25aa081f678531a7ba',
  cluster: 'us2',
  encrypted: true
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({
    success: true,
    votes: votes
  }))
})

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  }

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });
    return res.json({success: true, message: "Thank you for voting"})
  })
})

module.exports = router;
