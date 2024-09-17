import React from "react";
import { Container, Grid, Text, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

// Bảng mã thay thế tùy chỉnh (Substitution Table)
const substitutionTable: { [key: string]: string } = {
    a: 'q', b: 'w', c: 'e', d: 'r', e: 't', f: 'y', g: 'u', h: 'i', i: 'o', j: 'p',
    k: 'a', l: 's', m: 'd', n: 'f', o: 'g', p: 'h', q: 'j', r: 'k', s: 'l', t: 'z',
    u: 'x', v: 'c', w: 'v', x: 'b', y: 'n', z: 'm'
};

const reverseSubstitutionTable: { [key: string]: string } = Object.fromEntries(
    Object.entries(substitutionTable).map(([key, value]) => [value, key])
);

function substituteEncrypt(text: string): string {
    return text
        .toLowerCase()
        .split('')
        .map(char => substitutionTable[char] || char)  // Thay thế ký tự hoặc giữ nguyên nếu không nằm trong bảng
        .join('');
}

function substituteDecrypt(text: string): string {
    return text
        .toLowerCase()
        .split('')
        .map(char => reverseSubstitutionTable[char] || char)  // Thay thế ngược ký tự hoặc giữ nguyên
        .join('');
}

const SubstitutionCipher: React.FC = () => {
    const formEncrypt = useForm<{
        input: string;
        output: string;
    }>({
        initialValues: {
            input: "",
            output: "",
        },
    });

    const formDecrypt = useForm<{
        input: string;
        output: string;
    }>({
        initialValues: {
            input: "",
            output: "",
        },
    });

    const handleEncrypt = () => {
        formEncrypt.setValues({
            ...formEncrypt.values,
            output: substituteEncrypt(formEncrypt.values.input),
        });
    };

    const handleDecrypt = () => {
        formDecrypt.setValues({
            ...formDecrypt.values,
            output: substituteDecrypt(formDecrypt.values.input),
        });
    };

    return (
        <Container>
            <Text>Mã Thay Thế</Text>
            <Grid>
                <Grid.Col span={6}>
                    <Text>Mã hóa</Text>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Chuỗi gốc"
                            placeholder="Nhập chuỗi để mã hóa"
                            rows={10}
                            {...formEncrypt.getInputProps("input")}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Kết quả mã hóa"
                            placeholder="Kết quả mã hóa"
                            rows={10}
                            {...formEncrypt.getInputProps("output")}
                            readOnly
                        />
                    </Grid.Col>
                    <Button onClick={handleEncrypt}>Mã hóa</Button>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Text>Giải mã</Text>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Chuỗi mã hóa"
                            placeholder="Nhập chuỗi để giải mã"
                            rows={10}
                            {...formDecrypt.getInputProps("input")}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Kết quả giải mã"
                            placeholder="Kết quả giải mã"
                            rows={10}
                            {...formDecrypt.getInputProps("output")}
                            readOnly
                        />
                    </Grid.Col>
                    <Button onClick={handleDecrypt}>Giải mã</Button>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default SubstitutionCipher;
