import React, { useEffect, useRef, useState } from "react";
import { FileInput, Group, Stack, Button, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";


// Hàm chuyển chuỗi sang mã Hexadecimal
const textToHex = (text: string): string => {
    return text.split("").map((char) => char.charCodeAt(0).toString(16).padStart(2, "0")).join("");
};
// Hàm chuyển mã Hexadecimal về chuỗi gốc
const hexToText = (hex: string): string => {
    return hex.match(/.{1,2}/g)?.map((byte) => String.fromCharCode(parseInt(byte, 16))).join("") || "";
};

// Hàm mã hóa XOR
const xorEncrypt = (text: string, key: string): string => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(
            text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return textToHex(result); // Mã hóa kết quả thành Hexadecimal
};
// Hàm giải mã XOR
const xorDecrypt = (cipherText: string, key: string): string => {
    const hexDecoded = hexToText(cipherText); // Giải mã từ Hexadecimal về dạng chuỗi gốc
    let result = "";
    for (let i = 0; i < hexDecoded.length; i++) {
        result += String.fromCharCode(
            hexDecoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return result;
};

const key = "ccccccc";

const Th1: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [code, setCode] = useState<string>("");

    const form = useForm<FormTH1>({
        initialValues: {
            i_text: "",
            i_file: null,
            code: "",
        },
    });

    const handleSummit = (values: FormTH1) => {
        console.log(values);
    };

    // Mã hóa XOR và cập nhật vào form
    const handleEncrypt = (inputText: string) => {
        const cipherText = xorEncrypt(inputText, key);
        form.setFieldValue("code", cipherText); // Cập nhật kết quả mã hóa vào ô code
    };

    useEffect(() => {
        if (form.values.i_file) {
            const reader = new FileReader();
            reader.readAsText(form.values.i_file);
            reader.onload = (e) => {
                const result = e.target?.result?.toString() || "";
                handleEncrypt(result);  // Mã hóa nội dung file
            };
            setFileName(form.values.i_file.name); // Hiển thị tên file
            return;
        } else {
            setFileName(null);  // Xóa tên file nếu không có file nào
        }

        // Mã hóa nội dung trong input text khi giá trị thay đổi
        if (!form.values.i_file && form.values.i_text) {
            handleEncrypt(form.values.i_text); // Mã hóa nội dung từ input text
            return;
        }

        form.setValues({
            ...form,
            code: "",
        })
    }, [form.values]);

    // Xóa file và reset nội dung
    const handleClearFile = () => {
        form.setFieldValue("i_file", null);
        setFileName(null); // Xóa tên file
    };

    return (
        <Group
            style={{
                height: "100vh",
                width: "100%",
                justifyContent: "center",
                alignItems: "start",
            }}
        >
            <Stack
                style={{
                    width: "35%",
                }}
            >
                <form id="form-th-1" onSubmit={form.onSubmit(handleSummit)}>
                    <Stack style={{ width: "100%" }} gap={20}>
                        <Textarea
                            rows={10}
                            label="Input text"
                            {...form.getInputProps("i_text")}
                        />
                        <FileInput
                            label="Input file"
                            {...form.getInputProps("i_file")}
                        />

                        {/* Hiển thị tên file nếu có file được chọn */}
                        {fileName && <Text>Tên file: {fileName}</Text>}

                        {/* Nút xóa file */}
                        <Button onClick={handleClearFile} disabled={!fileName}>
                            Xóa file
                        </Button>

                        {/* Hiển thị kết quả mã hóa */}
                        <Textarea
                            label="Bản mã"
                            ref={textareaRef}
                            rows={10}
                            value={form.values.code}
                            readOnly
                            {...form.getInputProps("code")}
                        />
                    </Stack>
                </form>
            </Stack>

            <Stack
                style={{
                    width: "35%",
                }}
            >
                <form id="form-th-1" onSubmit={form.onSubmit(handleSummit)}>
                    <Stack style={{ width: "100%" }} gap={20}>
                        <Textarea
                            label="Bản mã"
                            rows={10}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                        <Textarea
                            label="Chuỗi gốc"
                            value={xorDecrypt(code, key) || ""}
                            readOnly
                            rows={10}
                        />
                    </Stack>
                </form>
            </Stack>
        </Group>
    );
};

type FormTH1 = {
    i_text: string;
    i_file: File | null;
    code: string;
};

export default Th1;
