import {Schema, model} from 'mongoose';

interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    active: boolean;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' },
  role: { type: String, required: true },
})

export const User = model<User>('User', userSchema);
