import { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
    S.list()
        .title("Painel de Vagas")
        .items([
            S.listItem()
                .title("Vagas Grupo Grão de Ouro")
                .schemaType("vaga")
                .child(
                    S.documentList()
                        .title("Vagas Grupo Grão de Ouro")
                        .filter(
                            '_type == "vaga" && empresa != "Grão de Ouro Máquinas"'
                        )
                        .initialValueTemplates([
                            S.initialValueTemplateItem("vaga-grupo"),
                        ])
                ),
            S.listItem()
                .title("Vagas Grão de Ouro Máquinas")
                .schemaType("vaga")
                .child(
                    S.documentList()
                        .title("Vagas Grão de Ouro Máquinas")
                        .filter(
                            '_type == "vaga" && empresa == "Grão de Ouro Máquinas"'
                        )
                        .initialValueTemplates([
                            S.initialValueTemplateItem("vaga-maquinas"),
                        ])
                ),
        ]);
