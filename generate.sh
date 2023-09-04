cp "./template/template.interface.txt" "./src/models/interfaces/I${1^}.ts"
sed -i "s/template/${1,,}/g" "./src/models/interfaces/I${1^}.ts"
sed -i "s/Template/${1^}/g" "./src/models/interfaces/I${1^}.ts"
echo "Created I${1^}.ts"

cp "./template/template.request.txt" "./src/models/requests/${1,,}.request.ts"
sed -i "s/template/${1,,}/g" "./src/models/requests/${1,,}.request.ts"
sed -i "s/Template/${1^}/g" "./src/models/requests/${1,,}.request.ts"
echo "Created ${1,,}.request.ts"

cp "./template/template.schema.txt" "./src/models/schemas/${1,,}.schema.ts"
sed -i "s/template/${1,,}/g" "./src/models/schemas/${1,,}.schema.ts"
sed -i "s/Template/${1^}/g" "./src/models/schemas/${1,,}.schema.ts"
echo "Created ${1,,}.schema.ts"

cp "./template/template.service.txt" "./src/services/${1,,}.service.ts"
sed -i "s/template/${1,,}/g" "./src/services/${1,,}.service.ts"
sed -i "s/Template/${1^}/g" "./src/services/${1,,}.service.ts"
echo "Created ${1,,}.service.ts"

cp "./template/template.controller.txt" "./src/controllers/v1/${1,,}.controller.ts"
sed -i "s/template/${1,,}/g" "./src/controllers/v1/${1,,}.controller.ts"
sed -i "s/Template/${1^}/g" "./src/controllers/v1/${1,,}.controller.ts"
echo "Created ${1,,}.controller.ts"


echo "import { ${1^}Controller } from './v1/${1,,}.controller';" >> "./src/controllers/index.ts"

exit