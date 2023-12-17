import { create } from 'zustand'

const usePdfStore = create((set) => ({
    pdfs: [],
    pdf: '',
    totalPages: 0,
    setPdfs: (value) => set((state) => ({ pdfs: value })),
    setPdf: (value) => set((state) => ({ pdf: value })),
    setTotalPages: (value) => set((state) => ({ totalPages: value })),

}))

export default usePdfStore