const express=require('express')
const mongoose=require('mongoose')
const app=express()
const Product=require('./models/productModel')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Hello preeti')
})

app.get('/blog',(req,res)=>{
    res.send('Hello blog, My name is preeti ')
})

app.get('/products',async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:error.message})
    }
    })

app.get('/products/:id',async(req,res)=>{
   try{
    const products=await Product.findById(req.params.id);
        res.status(200).json(products);
   }catch(error){
       res.status(500).json({message:error.message})
   }
})

app.post('/products',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
}) 

app.put('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,           // Return updated document
        runValidators: true  // Validate input based on schema
      });
  
      if (!product) {
        return res.status(404).json({ message: `Product with id ${id} not found` });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
app.delete('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product= await Product.findByIDAndDelete(id);
        if(!product){
            return res.status(404).json({message:`Product with id ${id} not found`})
     } 
     res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

mongoose.connect('mongodb+srv://preeti:theeagles2146@firstmongo.ottxtf9.mongodb.net/node-API?retryWrites=true&w=majority&appName=firstmongo')
.then(()=>{
    console.log('MongoDB connected')
    app.listen(3000,()=>{
        console.log(`Server is running on port 3000`)
    })
}).catch((error)=>{
    console.log(error)
})