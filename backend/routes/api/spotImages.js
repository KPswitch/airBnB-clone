const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models')
const router = express.Router();
