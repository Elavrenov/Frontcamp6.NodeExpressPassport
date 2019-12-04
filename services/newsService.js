const mongoose = require('mongoose');
require('../models/news');
const newsModel = mongoose.model('NewsModel');
    
async function getAllNews(){
    return await newsModel.find({},(e,news)=>{});
}

async function getNewsById(newsId){
    return await newsModel.findOne({id:newsId},(e,news)=>{})
}

async function createNews(params){
    await newsModel.create({id:+params.id, publisher:params.publisher, news:params.news},(e,news)=>{});
    console.log(await getNewsById(+params.id));
}

async function updateNews(newsId,params){
    const item = await getNewsById(+newsId);
    item.overwrite({id:+newsId, publisher:params.publisher,news:params.news});
    await item.save();
    console.log(await getNewsById(+newsId));
}

async function deleteNews(newsId){
    await newsModel.findOneAndRemove({id:+newsId});
}    
    
exports.mongooseNewsModel = {getAllNews ,getNewsById,createNews,updateNews, deleteNews};
