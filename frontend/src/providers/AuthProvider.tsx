import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios.ts";
import { Loader } from "lucide-react";


const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
            }
            catch (e) {
                updateApiToken(null)
                console.log('Error in auth provider', e)
            } finally {
                setLoading(false)
            }
        }

        initAuth()
    }, [getToken()]);

    if (loading) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                <Loader className='size-8 text-emerald-500 anime-spin' />
            </div>
        )
    }

    return (
        <div>
            {children}
        </div>
    );
};
