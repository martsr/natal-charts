import { Request,Response } from "express";
import { ChartModel } from "../models/chart-model";
import { validateChart, validatePartialchart } from "../schemas/chart-schema";
abstract class ChartController{
    static async getAll(req:Request,res:Response){
        return await ChartModel.getAll()
    }

    static async register(req:Request,res:Response){
        const validatedChart = validateChart(req.body)
        if(!validatedChart.success)
        res.status(400).json({error:JSON.parse(validatedChart.error.message)})
        const newChart=await ChartModel.register(req.body)
        res.status(200).json({message:"Chart added to DB",id:newChart})
    }

    static async update(req:Request,res:Response){
        const {id}=req.params
        const validatedData=validatePartialchart(req.body)
        if(!validatedData.success)res.status(404).json({error:JSON.parse(validatedData.error.message)})
        const {name,birthdate,time,asc,sun,moon,mercury,venus,mars}=req.body
        const updatedChart=await ChartModel.update({id,name,birthdate,time,asc,sun,moon,mercury,venus,mars})
        if(updatedChart===404) return res.status(404).json({message:"ID not found"})
        res.status(201).json({message:"Chart updated",updatedChart})
    }

    static async deleteChart(req:Request,res:Response){
        const{id}=req.params
        const deletedChart=await ChartModel.deleteChart(id)
        if(deletedChart===404) res.status(404).json({message:"ID not found"})
        res.status(200).json({message:"Chart deleted successfully",deletedChart})
    }
}

export {ChartController}