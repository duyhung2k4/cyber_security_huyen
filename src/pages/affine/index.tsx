import React, { useState } from "react";
import { Container, Grid, Text, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const MOD = 256;

function modInverse(a: number, m: number): number {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) {
            return i;
        }
    }
    throw new Error("a and m are not coprime, inverse does not exist.");
}

function affineEncryptByte(byte: number, a: number, b: number, mod: number): number {
    return (a * byte + b) % mod;
}

function affineDecryptByte(byte: number, aInverse: number, b: number, mod: number): number {
    return (aInverse * (byte - b + mod)) % mod;
}

const AffineFileEncrypt: React.FC = () => {
    const formAB = useForm<{
        a: number | undefined;
        b: number | undefined;
    }>({
        initialValues: {
            a: undefined,
            b: undefined,
        },
    });

    const [fileContent, setFileContent] = useState<ArrayBuffer | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target?.result as ArrayBuffer);
                setFileName(file.name);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const downloadFile = (content: ArrayBuffer, filename: string) => {
        const blob = new Blob([content], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const encryptFileContent = () => {
        if (fileContent && formAB.values.a && formAB.values.b) {
            const a = Number(formAB.values.a);
            const b = Number(formAB.values.b);
            const encryptedBuffer = new Uint8Array(fileContent);
            // const mod = 256; // Mã hóa trên giá trị byte (0-255)

            for (let i = 0; i < encryptedBuffer.length; i++) {
                encryptedBuffer[i] = affineEncryptByte(encryptedBuffer[i], a, b, MOD);
            }

            downloadFile(encryptedBuffer.buffer, `encrypted_${fileName}`);
        }
    };

    const decryptFileContent = () => {
        if (fileContent && formAB.values.a && formAB.values.b) {
            const a = Number(formAB.values.a);
            const b = Number(formAB.values.b);
            const aInverse = modInverse(a, 256); // Tính nghịch đảo mod 256 cho byte

            const decryptedBuffer = new Uint8Array(fileContent);
            const mod = 256;

            for (let i = 0; i < decryptedBuffer.length; i++) {
                decryptedBuffer[i] = affineDecryptByte(decryptedBuffer[i], aInverse, b, mod);
            }

            downloadFile(decryptedBuffer.buffer, `decrypted_${fileName}`);
        }
    };

    return (
        <Container>
            <Text>Mã hóa File bất kỳ định dạng</Text>
            <Grid>
                <Grid.Col span={6}>
                    <NumberInput
                        label="Key a"
                        placeholder="Key a"
                        {...formAB.getInputProps("a")}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <NumberInput
                        label="Key b"
                        placeholder="Key b"
                        {...formAB.getInputProps("b")}
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <Grid>
                        <Grid.Col span={12}>
                            <input type="file" onChange={handleFileUpload} />
                        </Grid.Col>
                        <Group gap={20}>
                            <Button onClick={encryptFileContent} disabled={!fileContent || !formAB.values.a || !formAB.values.b}>
                                Mã hóa file
                            </Button>
                            <Button onClick={decryptFileContent} disabled={!fileContent || !formAB.values.a || !formAB.values.b}>
                                Giải mã file
                            </Button>
                        </Group>
                    </Grid>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default AffineFileEncrypt;
