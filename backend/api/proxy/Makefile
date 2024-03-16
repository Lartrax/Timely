s: 
	bun index.ts

deploy:
	docker build . -t europe-north1-docker.pkg.dev/min-backend/bun-server/auth-proxy
	docker push europe-north1-docker.pkg.dev/min-backend/bun-server/auth-proxy
	gcloud run deploy bun-auth-proxy --image europe-north1-docker.pkg.dev/min-backend/bun-server/auth-proxy
