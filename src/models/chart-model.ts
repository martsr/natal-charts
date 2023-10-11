import { writeFile } from 'jsonfile'
import charts from '../database/charts.json'
import crypto from "node:crypto"
abstract class ChartModel{
    private static async findID(id:string){
        console.log(id)
        return charts.find(chart=>chart.id===id)
    }
    private static async writeDB(){
        return writeFile('./src/database/charts.json',charts)
    }
    static async getAll(){
        return charts
    }

    static async register(chart:any){
        chart.id=crypto.randomUUID()
        console.log(chart)
        charts.push(chart)
        this.writeDB()
        return chart.id
    }

    static async update(data:any){
        const {id,name,birthdate,time,asc,sun,moon,mercury,venus,mars}=data
        const foundID=await this.findID(id)
        if(!foundID)return 404
        if(name)foundID.name=name
        if(birthdate)foundID.birthdate=birthdate
        if(time)foundID.time=time
        if(asc)foundID.asc=asc
        if(sun)foundID.sun=sun
        if(moon)foundID.moon=moon
        if(mercury)foundID.mercury=mercury
        if(venus)foundID.venus=venus
        if(mars)foundID.mars=mars

        this.writeDB()
        return foundID
    }   

    static async deleteChart(id:string){
        const idIndex=charts.findIndex(chart=>chart.id ===id)
        if(idIndex==-1)return 404
        const deletedChart=charts[idIndex]
        charts.splice(idIndex,1)
        this.writeDB()
        return deletedChart
    }
}

export {ChartModel}