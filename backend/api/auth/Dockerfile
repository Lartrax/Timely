FROM rust:1.76-alpine3.19 as builder

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
COPY ./src ./src

RUN apk add alpine-sdk musl-dev build-base upx
RUN apk add libressl-dev

RUN rustup target add x86_64-unknown-linux-musl
RUN cargo build --release --target x86_64-unknown-linux-musl

FROM scratch

COPY --from=builder /target/x86_64-unknown-linux-musl/release/auth_api .

CMD ["./auth_api"]