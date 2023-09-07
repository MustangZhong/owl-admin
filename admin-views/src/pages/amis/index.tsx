import React, {useState} from "react"
import {useMount, useRequest} from "ahooks"
import {fetchPageSchema} from "@/service"
import AmisRender from "@/components/AmisRender"
import {useLocation} from 'react-router'
import {useSettings} from '@/hooks/useSettings.ts'
import {registerGlobalFunction} from '@/utils/common.ts'


function AmisPage() {
    const location = useLocation()
    const pathname = location.pathname
    // const settings = useSettings().get()

    const [schema, setSchema] = useState({})

    const initPage = useRequest(fetchPageSchema, {
        manual: true,
        loadingDelay: 300,
        cacheKey: pathname + "-schema",
        onSuccess(res) {
            // 先清空一次, 让数据也重新加载
            setSchema({})
            setSchema(res.data)
        }
    })

    registerGlobalFunction("refreshAmisPage", () => initPage.runAsync(pathname))

    useMount(() => initPage.run(pathname))

    return (
        <>
            <AmisRender schema={schema}/>
        </>
    )
}

export default AmisPage