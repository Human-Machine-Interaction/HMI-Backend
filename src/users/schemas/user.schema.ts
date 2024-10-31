
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProfile } from "../interfaces/users.interface"
import { IsEnum, ValidateNested } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema(
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            }
        }
    }
)
export class User {
    @Prop({ required: true, unique: true, trim: true, minlength: 6, maxlength: 30 })
    username: string

    @Prop({ required: true, minlength: 6, select: false })
    password: string

    @Prop({ required: true, default: "patient" })
    @IsEnum(["doctor", "patient"], { message: 'Role must be either doctor or patient' })
    role: "doctor" | "patient"

    @Prop({
        type:Object,
        default: {}
    })
    @ValidateNested()
    userProfile: IProfile

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MskProblem' }] })
    // mskProblem: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});