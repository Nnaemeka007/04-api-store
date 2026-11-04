
import { Request,Response } from "express"
import { Product } from "../models/product"


export const getAllProductsStatic=async(req:Request,res:Response)=>{
  // const search:string='a'
  const products=await Product.
  find({
    //  name:{$regex:search,$options:'i'}
    price:{$gt:30}
  })
  .sort('price')
  .select('name price')
  .limit(10)
  .skip(5)
  res.status(200).json({products,nbHits:products.length})
}

export const getAllProducts=async (req:Request,res:Response)=>{
  interface QueryObject{featured?:boolean,company?:string,name?:{$regex:string;$options:string}}
  const{featured,company,name,sort,fields,numericFilters}=req.query
  const queryObject:QueryObject={}

  if(featured){
    queryObject.featured=featured==='true'? true : false
  }

  if(typeof company==='string'){
    queryObject.company=company
  }
  if(typeof name==='string'){
    queryObject.name={$regex:name,$options:'i'}
  }
   
   if(typeof numericFilters==='string'){
    const operatorMap:Record<string,string>={
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }
    const regEx=/\b(<|>|>=|=|<|<=)\b/g
    let filters=numericFilters.replace(
      regEx,(match)=>`-${operatorMap}-`)


    const options=['price','rating']

      // filters= filters.split(',').forEach((item)=>{
      //   const [field,operator,value]:string[]=item.split('-').map(s=>s.trim());
      //   if(options.includes(field)){
      //     queryObject[field]={[operator]:Number(value)}

    //   filters.split(',').forEach((item)=>{
    //     const [field,operator,value]=item.split('-').map(s=>s.trim());
    //     if(options.includes(field)){
    //       queryObject[field]={[operator]:Number(value)}
    //     }
    // })
   }


    // console.log(queryObject)
  let result=Product.find(queryObject)
  // sort
  if(typeof sort==='string'){
    const sortList:string=sort.split(',').join(' ')
    result=result.sort(sortList)
  }
  else{
    result=result.sort('createdAt')
  }

  // select
  if(typeof fields==='string'){
    const fieldsList:string=fields.split(',').join(' ')
    result=result.select(fieldsList)
  }
  // pagination
    const page:number=Number(req.query.page) || 1;
    const limit:number=Number(req.query.limit) || 10;
    const skip:number=(page-1)*limit;
    
    result=result.skip(skip).limit(limit)

  const products=await result
  res.status(200).json({products,nbHits:products.length})
}