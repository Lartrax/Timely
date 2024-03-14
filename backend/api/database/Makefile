s: 
	cargo run

sr: 
	cargo run --release

deploy:
	docker build . -t europe-north1-docker.pkg.dev/min-backend/rustfull/database-api
	docker push europe-north1-docker.pkg.dev/min-backend/rustfull/database-api
	gcloud run deploy rust-database-api --image europe-north1-docker.pkg.dev/min-backend/rustfull/database-api
