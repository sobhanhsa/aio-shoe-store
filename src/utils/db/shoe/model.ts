import mongoose, { InferSchemaType, Schema } from "mongoose";


const shoeSchema = new Schema({
    category:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    images:{
        required:true,
        type:[{
            image:{
                type:String,
                required:true
            },
            color:{
                type:String,
                required:true
            }
        }],
    },
    colors:{
        required:true,
        type:[
            {
                color:{
                    type:{
                        color:{
                            type:String,
                            required:true
                        },
                        name:{
                            type:String,
                            required:true
                        }
                    },
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                },
            }
        ],
    },
    sizes:{
        required:true,
        type:[
            {
                size:{
                    type:Number,
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                }
            }
        ]
    },
    prices:{
        // required:true,
        type:[Number]
    },
    desc:{
        type:String,
        required:true
    }
},
{ timestamps: true }
);

export type ShoeType = InferSchemaType<typeof shoeSchema> & {
_id:string
};

export const ShoeModel = mongoose.models.Shoe || mongoose.model("Shoe",shoeSchema);
