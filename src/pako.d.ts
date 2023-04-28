declare module 'pako' {
    const pako: {
        deflate: typeof pako.deflate;
        inflate: typeof pako.inflate;
    };
    export default pako;
};  