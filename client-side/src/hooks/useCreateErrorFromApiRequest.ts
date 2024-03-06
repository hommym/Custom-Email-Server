import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const useCreateErrorFromApiRequest = (error: any) => {
  useEffect(() => {
    if (!error) return
    toast.error(error?.data?.error ? error?.data?.error : 'An error occurred during operation', { autoClose: 1500 })
  }, [error])
}

export default useCreateErrorFromApiRequest