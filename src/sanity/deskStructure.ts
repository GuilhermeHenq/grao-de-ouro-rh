import { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
    S.list()
        .title("Painel de Vagas")
        .items([
            S.listItem()
                .title("Vagas Grupo Grão de Ouro")
                .schemaType("vagaGrupo")
                .child(
                    S.documentTypeList("vagaGrupo")
                        .title("Vagas Grupo Grão de Ouro")
                ),
            S.listItem()
                .title("Vagas Grão de Ouro Máquinas")
                .schemaType("vagaMaquinas")
                .child(
                    S.documentTypeList("vagaMaquinas")
                        .title("Vagas Grão de Ouro Máquinas")
                ),
        ]);
