s: 
	cargo run

sr: 
	cargo run --release

deploy:
	docker build . -t europe-north1-docker.pkg.dev/min-backend/rustfull/auth-api
	docker push europe-north1-docker.pkg.dev/min-backend/rustfull/auth-api
	gcloud run deploy rust-auth-api --image europe-north1-docker.pkg.dev/min-backend/rustfull/auth-api
