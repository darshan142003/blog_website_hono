import React, { type ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupInput } from '@darsh777/medium-common';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(postInputs); // replace with API call
    };

    async function sendRequest() {

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate('/blog')
        } catch (e) {

        }


    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="p-5 w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">
                        {type === 'signup' ? 'Create an account' : 'Sign in to your account'}
                    </div>
                    <div className="text-slate-400 font-semibold">
                        {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <Link
                            to={type === 'signup' ? '/signin' : '/signup'}
                            className="text-blue-600 hover:underline ml-1"
                        >
                            {type === 'signup' ? 'Sign in' : 'Sign up'}
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mb-4 w-full"
                >
                    {type == "signup" ? <LabelledInput
                        label="Name"
                        placeholder="Enter your name"
                        onChange={(e) =>
                            setPostInputs((c) => ({ ...c, name: e.target.value }))
                        }
                    /> : null}

                    <LabelledInput
                        label="Email"
                        placeholder="Enter your Email"
                        onChange={(e) =>
                            setPostInputs((c) => ({ ...c, email: e.target.value }))
                        }
                    />
                    <LabelledInput
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        onChange={(e) =>
                            setPostInputs((c) => ({ ...c, password: e.target.value }))
                        }
                    />
                    <button
                        onClick={sendRequest}
                        className="bg-black text-white text-center py-2 rounded-md w-full"
                        type="submit"
                    >
                        {type === 'signup' ? 'Sign up' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

interface LabelledInputProps {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type
}: LabelledInputProps) {
    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || 'text'}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
