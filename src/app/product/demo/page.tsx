import React from 'react'
// import Editor from '@/components/form-compo/Editor'
import dynamic from 'next/dynamic'

var Editor = dynamic(() => import("@/components/form-compo/Editor"), {
  ssr: false
})

export default function Demo() {
  return (
    <div><Editor /></div>
  )
}
