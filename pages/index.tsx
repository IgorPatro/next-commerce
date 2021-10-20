import React from "react"

interface Props {
  prop: string
}

const Home: React.FC<Props> = ({ prop }) => {
  return <h1>Hello world! {prop}</h1>
}

export default Home
