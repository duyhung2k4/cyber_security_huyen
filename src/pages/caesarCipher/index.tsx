import React, { useEffect } from "react";
import { Container, NumberInput, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

const caesarCipher = (str: string, shift: number) => {
    return str.split('').map(char => {
        // Lấy mã ASCII của ký tự
        const code = char.charCodeAt(0);

        // Xử lý chữ thường
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }

        // Xử lý chữ in hoa
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }

        // Không phải chữ cái, giữ nguyên ký tự
        return char;
    }).join('');
}




const CaesarCipher: React.FC = () => {
    const form = useForm<{
        shift: number | undefined
        input: string
        output: string
    }>({
        initialValues: {
            shift: undefined,
            input: "",
            output: "",
        }
    });

    useEffect(() => {
        if (!form.values.shift) return;

        form.setValues({
            ...form.values,
            output: caesarCipher(form.values.input, form.values.shift),
        })

    }, [form.values]);



    return (
        <Container>
            <Text>Mã Caesar Cipher</Text>
            <NumberInput
                label="Số lượng dịch vòng"
                placeholder="Số lượng dịch vòng"
                {...form.getInputProps("shift")}
            />
            <Textarea
                label="Chuỗi gốc"
                placeholder="Chuỗi gốc"
                {...form.getInputProps("input")}
            />
            <Textarea
                label="Mã hóa"
                placeholder="Mã hóa"
                readOnly
                {...form.getInputProps("output")}
            />
        </Container>
    )
}

export default CaesarCipher;