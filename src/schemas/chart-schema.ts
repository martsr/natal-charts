import z from 'zod'

const chartSchema=z.object({
    name:z.string({
        required_error:'Name is required',
        invalid_type_error:"Name must be a string"
    }),
    birthdate:z.string({
        required_error:'Birthdate is required',
        invalid_type_error:"Birthdate must be a string"
    }),
    time:z.number({
        required_error:'Time is required',
        invalid_type_error:"Time must be a number"
    }),
    asc:z.number({
        required_error:'Ascendant is required',
        invalid_type_error:"Ascendant must be a number"
    }),
    sun:z.number({
        required_error:'Sun is required',
        invalid_type_error:"Sun must be a number"
    }),
    moon:z.number({
        required_error:'Moon is required',
        invalid_type_error:"Moon must be a number"
    }),
    mercury:z.number({
        required_error:'Mercury is required',
        invalid_type_error:"Mercury must be a number"
    }),
    venus:z.number({
        required_error:'Venus is required',
        invalid_type_error:"Venus must be a number"
    }),
    mars:z.number({
        required_error:'Mars is required',
        invalid_type_error:"Mars must be a number"
    })
})

const validateChart=(dataObj:any)=>chartSchema.safeParse(dataObj)
const validatePartialchart=(dataObj:any)=>chartSchema.partial().safeParse(dataObj)

export{validateChart,validatePartialchart}