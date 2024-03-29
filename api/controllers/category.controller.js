import Category from "../models/Category.model.js";
import errorWrapper from "express-async-handler";
import CustomError from "../utils/error/CustomError.js";
import Message from "../utils/message/message.util.js";
import { capitalize } from "../utils/helpers/input.helper.js";
import { SuccessResult } from "../utils/result/SuccessResult.js";
import { SuccessDataResult } from "../utils/result/SuccessDataResult.js";

export const createCategory = errorWrapper(async(req, res, next) => {

    const {categoryName} = req.body;

    if(!categoryName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await Category.create({
        categoryName: capitalize(categoryName),
        userUuid: req.user.uuid
    });

    return res
    .status(200)
    .json(new SuccessResult(Message.CategoryCreated));

});

export const updateCategory = errorWrapper(async(req, res, next) => {

    const {categoryName} = req.body;
    const category = req.queryResult;

    if(!categoryName){
        return next(new CustomError(400, Message.BlankInputs));
    }

    await category.update({
        categoryName: capitalize(categoryName)
    });

    return res
    .status(200)
    .json(new SuccessResult(Message.CategoryUpdated));

});

export const deleteCategory = errorWrapper(async(req, res, next) => {

    const category = req.queryResult;

    await category.destroy();

    return res
    .status(200)
    .json(new SuccessResult(Message.CategoryDeleted));

});

export const getCategoryById = errorWrapper(async(req, res, next) => {

    const category = req.queryResult;

    return res
    .status(200)
    .json(new SuccessDataResult(null, category));
    
});

export const getAllCategories = errorWrapper(async(req, res, next) => {

    const categories = await Category.findAll();

    return res
    .status(200)
    .json(new SuccessDataResult(null, categories));

});