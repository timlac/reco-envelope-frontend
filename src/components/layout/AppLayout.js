import {Layout, Menu} from 'antd';
import {Route, Link, Routes} from 'react-router-dom';
import {RandomizationList} from "../randomizer/RandomizationList";
import {RetrieveItems} from "../retrieval/RetrieveItems";
import {useEffect, useState} from "react";
import "./AppLayout.css"
import {DotChartOutlined} from "@ant-design/icons";

const {Header, Content, Footer} = Layout;

export const AppLayout = () => {

    const [selectedMenuItem, setSelectedMenuItem] = useState("/")

    const handleClick = e => setSelectedMenuItem(e.key)

    useEffect(() => {
        const currentPath = window.location.pathname.split("/").pop();
        if (selectedMenuItem !== currentPath){
            setSelectedMenuItem(currentPath)
        }
    }, [window.location.pathname]);

    return (
        <Layout>
            <Header style={{height: '40px', lineHeight: '40px', padding: '0 20px'}}>
                <Menu theme="dark" mode="horizontal" selectedKeys={[selectedMenuItem]} onClick={handleClick}>
                    <Menu.Item key="">
                        <Link to="">Simple Randomizer</Link>
                    </Menu.Item>
                    <Menu.Item key="retrieve_items">
                        <Link to="retrieve_items">Retrieval Service</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div>
                    <Routes>
                        <Route exact path="" element={<RandomizationList/>}/>
                        <Route path="retrieve_items" element={<RetrieveItems/>}/>
                        {/*<Route path="retrieve_items/:group_list_id" element={<RetrieveItems/>}/>*/}
                    </Routes>
                </div>
            </Content>
            <Footer className="centered-footer">
                <p>Timovia Technologies <DotChartOutlined /> </p>
            </Footer>
        </Layout>
    )
}