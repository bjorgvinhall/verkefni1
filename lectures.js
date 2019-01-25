
const express = require('express');
const fs = require('fs');
const util = require('util');

const item = require('./items.js');

const readFile = util.promisify(fs.readFile);

const router = express.Router();

async function lesaskra(){
  const skra = await readFile('./lectures.json');

  const json = JSON.parse(skra);

  return json;
}


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

//lesa fyrirlestrana inn og birta
async function list(req, res) {
  const data = await lesaskra();
  const title = 'Fyrirlestrar';
  const { lectures } = data;

  res.render('index', { title, lectures});
}

async function lecture(req, res, next) {
  const { slug } = req.params;
  const data = await lesaskra();
  const foundContent = data.lectures.find(a => a.slug === slug);
  if (!foundContent) {
    return next();
  }
  
  const { title } = foundContent;
  const { category } = foundContent;
  const html = item.createContent(foundContent.content);
  res.render('lectures', { title, html, category, lecture: foundContent });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));


module.exports = router;
