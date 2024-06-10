import { dossiersType } from "@/Components/Applications/dossiers/dossiers";
import { operationsType } from "@/Components/Applications/operations/operations";
import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Pagination {
  __typename: string;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface ResponseCollectionMeta {
  __typename: string;
  pagination: Pagination;
}

export type accueilModel = {
  operations?: any[]
  dossiers?: any[]
  dossiersrecent?: any[]
  dossiersLivrer?: ResponseCollectionMeta
  dossiersLivraisoncompagnie?: ResponseCollectionMeta
  dossiersCircuit?: ResponseCollectionMeta
  dossiersEncours?: ResponseCollectionMeta
  dossiersDeclaration?: ResponseCollectionMeta
};

const convert = (data: any): accueilModel => {

  return {
    operations: data?.operations.data ?? null,
    dossiers: data?.dossiers.data ?? null,
    dossiersrecent: data?.dossiersrecent.data ?? null,
    dossiersLivrer: data?.dossiersLivrer.meta ?? null,
    dossiersLivraisoncompagnie: data?.dossiersLivraisoncompagnie.meta ?? null,
    dossiersCircuit: data?.dossiersCircuit.meta ?? null,
    dossiersEncours: data?.dossiersEncours.meta ?? null,
    dossiersDeclaration: data?.dossiersDeclaration.meta ?? null,
  };
};

export const fetchData = async () => {
  try {

    
    const response = new ApolloClient({
      uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}/graphql`,
      cache: new InMemoryCache(),
    });

    const result = await response.query({
      query: gql`query {
  
        dossiers(
          sort: "createdAt:desc"
          filters: { EtatDossier: { ne: "Livrer" }, EstSupprimer: { eq: false } }
          pagination: { page: 1, pageSize: 10 }
        ) {
          data {
            id
            attributes {
              NumOT
              EtatDossier
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
              operations(
                sort: "Date:desc"
                filters: {
                  EstSupprimer: { eq: false }
                }
                pagination: { page: 1, pageSize: 100000 }
              ) {
                data {
                  id
                  attributes {
                    Date
                    Description
                    Montant
                    TypeOperation
                  }
                }
              }
              operationsEtntree: operations(
                sort: "Date:desc"
                filters: {
                  TypeOperation: { eq: "ENTREE D'ARGENT" }
                  EstSupprimer: { eq: false }
                }
                pagination: { page: 1, pageSize: 100000 }
              ) {
                data {
                  id
                  attributes {
                    Date
                    Description
                    Montant
                    TypeOperation
                  }
                }
              }
              operationsSortie: operations(
                sort: "Date:desc"
                filters: {
                  TypeOperation: { eq: "SORTIE D'ARGENT" }
                  EstSupprimer: { eq: false }
                }
                pagination: { page: 1, pageSize: 100000 }
              ) {
                data {
                  id
                  attributes {
                    Date
                    Description
                    Montant
                    TypeOperation
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
        operations(
          sort: "Date:desc"
          filters: { EstSupprimer: { eq: false } }
          pagination: { page: 1, pageSize: 10 }
        ) {
          data {
            id
            attributes {
              Date
              Description
              Montant
              TypeOperation
              dossier {
                data {
                  id
                  attributes {
                    NumOT
                    EtatDossier
                  }
                }
              }
              createdAt
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
        dossiersrecent: dossiers(
          sort: "createdAt:desc"
          filters: { EstSupprimer: { eq: false } }
          pagination: { page: 1, pageSize: 10 }
        ) {
          data {
            id
            attributes {
              NumOT
              EtatDossier
              NomNavire
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
        dossiersLivrer: dossiers(
          filters: { EtatDossier: { eq: "Livrer" }, EstSupprimer: { eq: false } }
          pagination: { page: 1, pageSize: 1000000 }
        ) {
          data {
            id
            attributes {
              NumOT
              EtatDossier
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
        dossiersLivraisoncompagnie: dossiers(
          filters: {
            EtatDossier: { eq: "Livraison compagnie" }
            EstSupprimer: { eq: false }
          }
          pagination: { page: 1, pageSize: 1000000 }
        ) {
          data {
            id
            attributes {
              NumOT
              EtatDossier
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
        dossiersCircuit: dossiers(
          filters: { EtatDossier: { eq: "Circuit" }, EstSupprimer: { eq: false } }
          pagination: { page: 1, pageSize: 1000000 }
        ) {
          data {
            id
            attributes {
              NumOT
              EtatDossier
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
        dossiersEncours: dossiers(
          filters: { EtatDossier: { eq: "En cours" }, EstSupprimer: { eq: false } }
          pagination: { page: 1, pageSize: 1000000 }
        ) {
          data {
            id
            attributes {
              NumOT
              EtatDossier
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
        dossiersDeclaration: dossiers(
          filters: {
            EtatDossier: { eq: "N. Déclaration" }
            EstSupprimer: { eq: false }
          }
          pagination: { page: 1, pageSize: 1000000 }
        ) {
          data {
            id
            attributes {
              NumOT
              EtatDossier
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
      }`,
    });


    const converted: accueilModel= convert(result.data);

    return converted;

  } catch (error) {
    console.error("Erreur lors de la récupération des accueilModel:", error);
  }
};


const convertOperation = (data: any): operationsType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Description: data.attributes?.Description ?? null,
    Montant: data.attributes?.Montant ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,    
    Date: data.attributes?.Date
      ? new Date(data.attributes?.Date).toISOString().substring(0, 19)
      : "",
    TypeOperation: data.attributes?.TypeOperation ?? null,
    dossier: data.attributes?.dossier.data != null ? data.attributes?.dossier.data.id : null,    
    NumDossier: data.attributes?.dossier.data != null ? data.attributes?.dossier.data.attributes?.NumOT : "",
  };
};

export const fetchDossierData = async () => {
  try {

    
    const response = new ApolloClient({
      uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}/graphql`,
      cache: new InMemoryCache(),
    });

    const result = await response.query({
      query: gql`query {
        dossiers(
          sort: "createdAt:desc"
          filters: { EstSupprimer: { eq: false } }
          pagination: { page: 1, pageSize: 100000 }
        ) {
          data {
            id
            attributes {
              DateCreation
              NumOT
              Payeur
              PersContate
              NumTel
              Ordre_de
              NomNavire
              NumPlomb
              NbreEtNatureMachandise
              Colis
              Poid
              NbrTc
              NumTC
              Pied
              PortEmbarquement
              PortDechargement
              NbreCopie
              NumFactFournisseur
              MontantFactFounisseur
              Assurance
              MonatantAssurance
              RFCV
              FDI
              ListeColisage
              CertifOrigine
              AutreDocs
              Expediteur
              TirageDecLarartion
              DateDeclaration
              NumDeclaration
              NatureDeclaration
              Observation
              DatePrevision
              NmBl
              StatutDocDouane
              LieuLivraison
              ObtenssionAttestation
              LibeleAttestation
              SatueDocs
              MontantDouane
              EstAnnuler
              Regime
              DatePrevisionAlarm
              TT
              BSC
              ConteurFacture
              DatePrevisionArrvie
              DateModifSuivie
              NumDeCompteur
              Adresse
              BlOrigninal
              BlCopie
              Echenace
              NumDEC
              Nature
              Marchandise
              EtatDossier
              StatutDossier
              Montant
              EstDebiter
              EstCrediter
              MontanDebit
              MontantCredit
              createdAt
              Client {
                data {
                  id
                  attributes {
                    Noms
                    PersonContacte
                  }
                }
              }
              operations(
                sort: "Date:desc"
                filters: {
                  EstSupprimer: { eq: false }
                }
                pagination: { page: 1, pageSize: 100000 }
              ) {
                data {
                  id
                  attributes {
                    Date
                    Description
                    Montant
                    TypeOperation
                  }
                }
              }
              
              operationsEtntree: operations(
                sort: "Date:desc"
                filters: {
                  TypeOperation: { eq: "ENTREE D'ARGENT" }
                  EstSupprimer: { eq: false }
                }
                pagination: { page: 1, pageSize: 100000 }
              ) {
                data {
                  id
                  attributes {
                    Date
                    Description
                    Montant
                    TypeOperation
                  }
                }
              }
              operationsSortie: operations(
                sort: "Date:desc"
                filters: {
                  TypeOperation: { eq: "SORTIE D'ARGENT" }
                  EstSupprimer: { eq: false }
                }
                pagination: { page: 1, pageSize: 100000 }
              ) {
                data {
                  id
                  attributes {
                    Date
                    Description
                    Montant
                    TypeOperation
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
      }`,
    });


    const converted: any[] = result.data.dossiers.data;

    return converted;

  } catch (error) {
    console.error("Erreur lors de la récupération des accueilModel:", error);
  }
};