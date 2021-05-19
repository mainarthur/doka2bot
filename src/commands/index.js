const RandomPictureCommand = require('./randomPicture')
const StartCommand = require('./start')

const CatPictureApi = require('../api/CatPictureApi')
const DogPictureApi = require('../api/DogPictureApi')
const FoxPictureApi = require('../api/FoxPictureApi')
const ShibePictureApi = require('../api/ShibePictureApi')

/**
 * @typedef {String} CommandName
 *
 * @type {Object.<CommandName, import('./Command')>}
 */
const commandsRoutes = {
  start: new StartCommand(),
  cat: new RandomPictureCommand(new CatPictureApi()),
  dog: new RandomPictureCommand(new DogPictureApi()),
  fox: new RandomPictureCommand(new FoxPictureApi()),
  shibe: new RandomPictureCommand(new ShibePictureApi()),
}

module.exports = commandsRoutes
