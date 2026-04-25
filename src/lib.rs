use heic::{DecoderConfig, Limits, PixelLayout};

#[unsafe(no_mangle)]
pub fn decode_rgba(bytes_ptr: *const u8, len: usize) -> Box<[u8; 12]> {
    let bytes = unsafe { std::slice::from_raw_parts(bytes_ptr, len) };

    let mut limits = Limits::default();
    limits.max_width = Some(16_384);
    limits.max_height = Some(16_384);
    limits.max_pixels = Some(64_000_000);
    limits.max_memory_bytes = Some(1_073_741_824);

    let output = match DecoderConfig::new()
        .decode_request(bytes)
        .with_output_layout(PixelLayout::Rgba8)
        .with_limits(&limits)
        .decode()
    {
        Ok(output) => output,
        Err(err) => panic!("{err:?}"),
    };
    let width = output.width as u16;
    let height = output.height as u16;
    let mut data = output.data.into_boxed_slice();
    let len = data.len() as u32;
    let ptr = Box::into_raw(data) as *mut u8 as u32;
    let mut ptr_len_width_height = Vec::with_capacity(12);
    ptr_len_width_height.extend_from_slice(&ptr.to_le_bytes());
    ptr_len_width_height.extend_from_slice(&len.to_le_bytes());
    ptr_len_width_height.extend_from_slice(width.to_le_bytes().as_slice());
    ptr_len_width_height.extend_from_slice(height.to_le_bytes().as_slice());
    unsafe {
        Box::from_raw(Box::into_raw(ptr_len_width_height.into_boxed_slice()) as *mut [u8; 12])
    }
}

#[unsafe(no_mangle)]
pub fn malloc(len: usize) -> *mut u8 {
    let mut vec = Vec::<u8>::with_capacity(len);
    let ptr = vec.as_mut_ptr();
    core::mem::forget(vec);
    ptr
}

#[unsafe(no_mangle)]
pub fn free(ptr: *mut u8, len: usize) {
    unsafe {
        Vec::from_raw_parts(ptr, 0, len);
    }
}
