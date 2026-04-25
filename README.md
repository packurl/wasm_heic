![crates.io](https://img.shields.io/crates/v/wasm_heic.svg)

[WASM](https://developer.mozilla.org/en-US/docs/WebAssembly) libs
for [HEIC](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format) image decoding.

This is a simple wrapper on top of
the [heic](https://github.com/imazen/heic) [rust](https://www.rust-lang.org/) [crate](https://crates.io/crates/heic) for
decoding the image file to rgba8.

<br>

Compilation:

`cargo build --release`

Wasm file optimization:

`wasm-opt --dce --vacuum -Oz target/wasm32-unknown-unknown/release/wasm_heic.wasm -o heic.wasm`

<br>

Dependencies:

- [heic](https://github.com/imazen/heic) ([AGPL3](https://github.com/imazen/heic/blob/main/LICENSE-AGPL3))
