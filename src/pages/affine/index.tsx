import React, { useEffect } from "react";
import { Container, Grid, Text, Textarea, TextInput } from "@mantine/core";
import { ALPHABET_SIZE } from "@/constant/code";
import { useForm } from "@mantine/form";


function modInverse(a: number, m: number): number {
    // Tìm nghịch đảo modulo của a dưới mod m
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) {
            return i;
        }
    }
    throw new Error("a and m are not coprime, inverse does not exist.");
}

function affineEncrypt(text: string, a: number, b: number): string {
    return text
        .toLowerCase()
        .split('')
        .map((char) => {
            if (char < 'a' || char > 'z') return char; // Bỏ qua ký tự không phải chữ cái
            const x = char.charCodeAt(0) - 'a'.charCodeAt(0); // Giá trị số của ký tự
            const encryptedChar = (a * x + b) % ALPHABET_SIZE;
            return String.fromCharCode(encryptedChar + 'a'.charCodeAt(0));
        })
        .join('');
}

function affineDecrypt(text: string, a: number, b: number): string {
    const aInverse = modInverse(a, ALPHABET_SIZE);
    return text
        .toLowerCase()
        .split('')
        .map((char) => {
            if (char < 'a' || char > 'z') return char; // Bỏ qua ký tự không phải chữ cái
            const y = char.charCodeAt(0) - 'a'.charCodeAt(0); // Giá trị số của ký tự
            const decryptedChar = (aInverse * (y - b + ALPHABET_SIZE)) % ALPHABET_SIZE;
            return String.fromCharCode(decryptedChar + 'a'.charCodeAt(0));
        })
        .join('');
}


const Affine: React.FC = () => {
    const formAB = useForm<{
        a: number | undefined
        b: number | undefined
    }>({
        initialValues: {
            a: undefined,
            b: undefined
        }
    })

    const formEncrypt = useForm<{
        input: string
        output: string
    }>({
        initialValues: {
            input: "",
            output: "",
        }
    })

    const formDecrypt = useForm<{
        input: string
        output: string
    }>({
        initialValues: {
            input: "",
            output: "",
        }
    })

    useEffect(() => {
        if (!formAB.values.a || !formAB.values.b) return;

        formEncrypt.setValues({
            ...formEncrypt.values,
            output: affineEncrypt(formEncrypt.values.input, Number(formAB.values.a), Number(formAB.values.b))
        })
    }, [
        formAB.values.a,
        formAB.values.b,
        formEncrypt.values.input,
    ]);

    useEffect(() => {
        if (!formAB.values.a || !formAB.values.b) return;

        formDecrypt.setValues({
            ...formDecrypt.values,
            output: affineDecrypt(formDecrypt.values.input, Number(formAB.values.a), Number(formAB.values.b))
        })
    }, [
        formAB.values.a,
        formAB.values.b,
        formDecrypt.values.input,
    ])

    return (
        <>
            <Container>
                <Text>Mã Affine</Text>
                <Grid>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Key a"
                            placeholder="Key a"
                            {...formAB.getInputProps("a")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Key b"
                            placeholder="Key b"
                            {...formAB.getInputProps("b")}
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text>Mã hóa</Text>
                        <Grid.Col span={12}>
                            <Textarea
                                label="Chuỗi gốc"
                                placeholder="Chuỗi gốc"
                                rows={10}
                                {...formEncrypt.getInputProps("input")}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Textarea
                                label="Mã hóa"
                                placeholder="Mã hóa"
                                rows={10}
                                {...formEncrypt.getInputProps("output")}
                                readOnly
                            />
                        </Grid.Col>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text>Giải mã</Text>
                        <Grid.Col span={12}>
                            <Textarea
                                label="Mã hóa"
                                placeholder="Mã hóa"
                                {...formDecrypt.getInputProps("input")}
                                rows={10}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Textarea
                                label="Chuỗi gốc"
                                placeholder="Chuỗi gốc"
                                rows={10}
                                {...formDecrypt.getInputProps("output")}
                                readOnly
                            />
                        </Grid.Col>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

export default Affine;