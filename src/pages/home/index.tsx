import React from "react";
import { Button, Container, Grid, Text } from "@mantine/core";
import { ROUTER_APP } from "@/constant/router";
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
    const navigation = useNavigate();

    const handleNavigation = (href: string) => {
        navigation(href);
    }

    return (
        <Container>
            <Text>Danh sách mã hóa</Text>
            <Grid mt={20}>
                {
                    Object.keys(ROUTER_APP).filter(key => key !== "HOME").map(key =>
                        <Grid.Col key={key} span={3}>
                            <Button w={"100%"} onClick={() => handleNavigation((ROUTER_APP as any)?.[key].href)}>{(ROUTER_APP as any)?.[key].name}</Button>
                        </Grid.Col>
                    )
                }
            </Grid>
        </Container>
    )
}

export default Home;