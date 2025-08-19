import { atom } from 'recoil'
import { type Blog } from '../hooks'


export const blogListState = atom<Blog[]>({
    key: "blogListState",
    default: [],
});

export const blogDetailState = atom<Record<string, Blog>>({
    key: "blogDetailState",
    default: {},
})


