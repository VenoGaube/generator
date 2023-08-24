"use strict";
import vscode = require("vscode");
import { COMPONENT_CHOICES, CREATE_TOKEN_CHOICES, FEATURE_CHOICES } from "../choices";
import { COMPONENT_MARKETPLACE } from "../components/marketplace/data";
import { SERVICE_WALLET } from "../services/walletService";
import { MODELS } from "../models/data";
import { COMPONENT_IMAGE_TOKEN_FOR_SALE } from "../components/imageTokenForSale/data";
import { COMPONENT_FILE_TOKEN_FOR_SALE } from "../components/fileTokenForSale/data";
import { COMPONENT_SEARCH } from "../components/search/data";
import { CONTRACT_MARKETPLACE } from "../contracts/marketplace";
import { CONTRACT_MARKETPLACE_TOKEN } from "../contracts/marketplaceToken";
import { CONTRACT_MIGRATIONS } from "../contracts/migrations";
import { SERVICE_MENU } from "../services/menu";
import { SERVICE_MARKETPLACE } from "../services/marketplace";
import { SERVICE_MARKETPLACE_FACTORY } from "../services/marketplaceFactory";
import { SERVICE_MARKETPLACE_TOKEN } from "../services/marketplaceToken";
import { SERVICE_RESOLVE_LOADER } from "../services/resolve-loader";
import { SERVICE_MARKETPLACE_TOKEN_FACTORY } from "../services/marketplaceTokenFactory";
import { JS_MIGRATIONS } from "../migrations/data";
import { CONFIG_TRUFFLE } from "../config/truffleConfig";
import { SHARED_FOOTER } from "../shared/footer";
import { SHARED_MODULE } from "../shared/shared";
import { SHARED_NAVBAR } from "../shared/navbar";
import { RESOLVER_PROFILE_NFT_LIST } from "../resolvers/profileNFTList";
import { RESOLVER_NFT_LIST } from "../resolvers/nftList";
import { COMPONENT_CREATE_TOKEN } from "../components/createToken/data";
import { COMPONENT_PROFILE } from "../components/profile/data";
import { SHARED_MODULE_IMPORT, allowSyntheticDefaultImports, importFiles } from "../constants/appModule";
import { MARKETPLACE_COMPONENT_IMPORT } from "../constants/appModule";
import { SEARCH_COMPONENT_IMPORT } from "../constants/appModule";
import { PROFILE_COMPONENT_IMPORT } from "../constants/appModule";
import { IMAGE_TOKEN_FOR_SALE_COMPONENT_IMPORT } from "../constants/appModule";
import { IMAGE_ITEM_COMPONENT_IMPORT } from "../constants/appModule";
import { FILE_ITEM_COMPONENT_IMPORT } from "../constants/appModule";
import { FILE_TOKEN_FOR_SALE_COMPONENT_IMPORT } from "../constants/appModule";
import { CREATE_IMAGE_TOKEN_IMPORT } from "../constants/appModule";
import { CREATE_FILE_TOKEN_IMPORT } from "../constants/appModule";
import { CREATE_JSON_TOKEN_IMPORT } from "../constants/appModule";
import { MARKETPLACE_COMPONENT_DECLARATION } from "../constants/appModule";
import { SEARCH_COMPONENT_DECLARATION } from "../constants/appModule";
import { PROFILE_COMPONENT_DECLARATION } from "../constants/appModule";
import { IMAGE_TOKEN_FOR_SALE_COMPONENT_DECLARATION } from "../constants/appModule";
import { FILE_TOKEN_FOR_SALE_COMPONENT_DECLARATION } from "../constants/appModule";
import { IMAGE_ITEM_COMPONENT_DECLARATION } from "../constants/appModule";  
import { FILE_ITEM_COMPONENT_DECLARATION } from "../constants/appModule";
import { CREATE_IMAGE_TOKEN_DECLARATION } from "../constants/appModule";
import { CREATE_FILE_TOKEN_DECLARATION } from "../constants/appModule";
import { CREATE_JSON_TOKEN_DECLARATION } from "../constants/appModule";
import path = require("path");
import fs = require("fs");
import { declarations, imports, declareGlobal, SHARED_IMPORTS_COMPONENT, compilerOptions, dependencies, styles, scripts, routes, routeImports } from "../constants/appModule";
import { COMPONENT_FILE_ITEM } from "../components/fileItem/data";
import { COMPONENT_IMAGE_ITEM } from "../components/imageItem/data";
var getDirName = require('path').dirname;
/**
 * Main command to create a file from a template.
 * This command can be invoked by the Command Palette or in a folder context menu on the explorer view.
 * @export
 * @param {TemplatesManager} templatesManager
 * @param {*} args
 * @returns
 */
export function run(args: any) {

    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: 'Select the src/app folder',
        canSelectFiles: false,
        canSelectFolders: true
    };

    vscode.window.showOpenDialog(options).then(fileUri => {
    
        if (fileUri && fileUri[0]) {
            
            let baseProjectFolder = fileUri[0].fsPath;
            baseProjectFolder = path.join(baseProjectFolder,'../../');
            const targetFolder = fileUri[0].fsPath;

            vscode.window.showQuickPick(COMPONENT_CHOICES.map(c => c.value), { placeHolder: 'Select the component.' })
            .then((componentChoice) => {
                let chosenComponent = COMPONENT_CHOICES.find(o => o.value === componentChoice)!;

                if (chosenComponent.tag === 'marketplace') {
                    vscode.window.showQuickPick(FEATURE_CHOICES.map(c => c.value), { placeHolder: 'Select the desired features.', canPickMany: true, ignoreFocusOut: true  })
                    .then(async pickedFeatures => {
                        if (pickedFeatures === undefined) {
                            return run(null);
                        }

                        let profileTokenChoices: string[] = [];
                        if (pickedFeatures.find(choice => choice === 'Profile')) {

                           await vscode.window.showQuickPick(CREATE_TOKEN_CHOICES.map(c => c.value), { placeHolder: 'Select the token upload.', canPickMany: true, ignoreFocusOut: true })
                                .then(pickedProfileTokenChoices => {
                                    if (pickedProfileTokenChoices === undefined) {
                                        return;
                                    }
                                    profileTokenChoices = pickedProfileTokenChoices;
                                });
                        }

                        let localImportFiles = importFiles;
                        let localDeclaration = declarations;
                        let localImport = imports;
                        let numOfCalls = 0;
                        pickedFeatures.forEach(feature => {
                            switch (feature) {
                                case 'Marketplace':
                                    localImportFiles = localImportFiles + '\n' + MARKETPLACE_COMPONENT_IMPORT;
                                    localDeclaration = localDeclaration + '\n' + MARKETPLACE_COMPONENT_DECLARATION;
                                break;
                                case 'Marketplace search bar':
                                    localImportFiles = localImportFiles + '\n' + SEARCH_COMPONENT_IMPORT;
                                    localDeclaration = localDeclaration + '\n' + SEARCH_COMPONENT_DECLARATION;
                                break;
                                case 'Profile':
                                    localImportFiles = localImportFiles + '\n' + PROFILE_COMPONENT_IMPORT;
                                    localImportFiles = localImportFiles + '\n' + IMAGE_ITEM_COMPONENT_IMPORT;
                                    localImportFiles = localImportFiles + '\n' + FILE_ITEM_COMPONENT_IMPORT;
                                    
                                    localDeclaration = localDeclaration + '\n' + PROFILE_COMPONENT_DECLARATION;
                                    localDeclaration = localDeclaration + '\n' + IMAGE_ITEM_COMPONENT_DECLARATION;
                                    localDeclaration = localDeclaration + '\n' + FILE_ITEM_COMPONENT_DECLARATION;
                                break;
                                case 'Image token':
                                    localImportFiles = localImportFiles + '\n' + IMAGE_TOKEN_FOR_SALE_COMPONENT_IMPORT;
                                    localDeclaration = localDeclaration + '\n' + IMAGE_TOKEN_FOR_SALE_COMPONENT_DECLARATION;
                                break;
                                case 'File token':
                                    localImportFiles = localImportFiles + '\n' + FILE_TOKEN_FOR_SALE_COMPONENT_IMPORT;
                                    localDeclaration = localDeclaration + '\n' + FILE_TOKEN_FOR_SALE_COMPONENT_DECLARATION;
                                break;
                                case 'Navigation bar':
                                case 'Footer':
                                    localImport = localImport + '\n' + SHARED_IMPORTS_COMPONENT;
                                break;
                            }
                        });

                        if (pickedFeatures.find(choice => choice === 'Navigation bar' || choice === 'Footer')) {
                            if (numOfCalls === 0) {
                                localImportFiles = localImportFiles + '\n' + SHARED_MODULE_IMPORT;
                                numOfCalls = 1;
                            }
                        }

                        profileTokenChoices.forEach(choice => {
                            switch (choice) {
                                case 'Generate Image token creation Component':
                                    localImportFiles = localImportFiles + '\n' + CREATE_IMAGE_TOKEN_IMPORT;
                                    localDeclaration = localDeclaration + '\n' + CREATE_IMAGE_TOKEN_DECLARATION;
                                break;
                                case 'Generate File token creation Component':
                                    localImportFiles = localImportFiles + '\n' + CREATE_FILE_TOKEN_IMPORT;
                                    localDeclaration = localDeclaration + '\n' + CREATE_FILE_TOKEN_DECLARATION;
                                break;
                                case 'Generate JSON token creation Component':
                                    localImportFiles = localImportFiles + '\n' + CREATE_JSON_TOKEN_IMPORT;
                                    localDeclaration = localDeclaration + '\n' + CREATE_JSON_TOKEN_DECLARATION;
                                break;
                            }
                        });
                        
                        // ts config
                        const tsConfigFilePath = path.join(baseProjectFolder, 'tsconfig.json');
                        let tsConfigFileContent = fs.readFileSync(tsConfigFilePath, 'utf8');
                        const extraCompilerOptions = compilerOptions + '\n' + allowSyntheticDefaultImports;
                        const localTsConfigFileContent = tsConfigFileContent.replace('"compilerOptions": {', extraCompilerOptions);
                        fs.writeFileSync(tsConfigFilePath, localTsConfigFileContent);

                        // package json
                        const packageJsonFilePath = path.join(baseProjectFolder, 'package.json');
                        let packageJsonFileContent = fs.readFileSync(packageJsonFilePath, 'utf8');
                        const localDependenciesFileContent = packageJsonFileContent.replace('"dependencies": {', dependencies);
                        fs.writeFileSync(packageJsonFilePath, localDependenciesFileContent);

                        // angular json
                        const angularJsonFilePath = path.join(baseProjectFolder, 'angular.json');
                        let angularJsonFileContent = fs.readFileSync(angularJsonFilePath, 'utf8');
                        const localScriptsContent = angularJsonFileContent.replace('"scripts": [', scripts);
                        fs.writeFileSync(angularJsonFilePath, localScriptsContent);
                        
                        angularJsonFileContent = fs.readFileSync(angularJsonFilePath, 'utf8');
                        const localStylesContent = angularJsonFileContent.replace('"styles": [', styles);
                        fs.writeFileSync(angularJsonFilePath, localStylesContent);

                        // app routing module routeImports
                        const appRoutingModulePath = path.join(targetFolder, 'app-routing.module.ts');
                        let appRoutingModuleContent = fs.readFileSync(appRoutingModulePath, 'utf8');
                        let localAppRoutingModuleContent = appRoutingModuleContent.replace('const routes: Routes = [', routes);
                        localAppRoutingModuleContent = routeImports + '\n' + localAppRoutingModuleContent;
                        fs.writeFileSync(appRoutingModulePath, localAppRoutingModuleContent);

                        // app module import statements, imports, declarations.
                        const filePath = path.join(targetFolder, 'app.module.ts');
                        let fileContent = fs.readFileSync(filePath, 'utf8');
                        const addImportLines = localImportFiles + fileContent;
                        fs.writeFileSync(filePath, addImportLines);

                        fileContent = fs.readFileSync(filePath, 'utf8');
                        const hasDeclarations = fileContent.replace('declarations: [', localDeclaration);
                        fs.writeFileSync(filePath, hasDeclarations);

                        fileContent = fs.readFileSync(filePath, 'utf8');
                        const hasLocalImports = fileContent.replace('imports: [', localImport);
                        fs.writeFileSync(filePath, hasLocalImports);

                        fileContent = fs.readFileSync(filePath, 'utf8');
                        const addDeclareGlobal = fileContent + declareGlobal;
                        fs.writeFileSync(filePath, addDeclareGlobal);

                        // Create path to services
                        const pathToServices = path.join(targetFolder, 'services');
                        // Create path to components
                        const pathToComponents = path.join(targetFolder, 'components');
                        // Create path to shared components
                        const pathToShared = path.join(targetFolder, 'shared');
                        // Create path to models
                        const pathToModels = path.join(targetFolder, 'models');
                        // Create path to resolvers
                        const pathToResolvers = path.join(targetFolder, 'resolvers');
                        // Create path to Solidity contract migrations
                        const pathToMigrations = path.join(baseProjectFolder, 'migrations');
                        // Create path to truffle config
                        const pathToConfigTruffle = path.join(baseProjectFolder, 'truffle-config');

                        if (pickedFeatures.length > 0) {
                            // Create wallet service component
                            let walletServiceObj = SERVICE_WALLET.find(o => o.tag === 'serviceWallet');
    
                            const pathToWalletService = path.join(pathToServices, 'wallet');
                            fs.mkdir(getDirName(pathToWalletService), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToWalletService + '.service.ts', walletServiceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                        }

                        // START SEARCH BAR
                        if (pickedFeatures.find(choice => choice === 'Marketplace search bar')) {
                            // Create Search component
                            let searchObj = COMPONENT_SEARCH.find(o => o.tag === 'search');
                            const pathToSearchComponent = path.join(pathToComponents, 'marketplace/search/search');
                            fs.mkdir(getDirName(pathToSearchComponent), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToSearchComponent + '.component.html', searchObj!.html, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });

                                fs.writeFile(pathToSearchComponent + '.component.ts', searchObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });

                                fs.writeFile(pathToSearchComponent + '.component.css', searchObj!.css, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                        }
                        // END SEARCH BAR


                        // START JOINED COMPONENTS MARKETPLACE & MARKETPLACE SERACH BAR
                        if (pickedFeatures.find(choice => choice === 'Marketplace' || choice === 'Marketplace search bar')) {
                            // Create Filter model component
                            let filterObj = MODELS.find(o => o.tag === 'filter');
    
                            const pathToFilterModel = path.join(pathToModels, 'filter');
                            fs.mkdir(getDirName(pathToFilterModel), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToFilterModel + '.model.ts', filterObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                        }
                        // END JOINED COMPONENTS MARKETPLACE & MARKETPLACE SERACH BAR

                        
                        // START MARKETPLACE
                        if (pickedFeatures.find(choice => choice === 'Marketplace')) {

                            // Create marketplaceToken service
                            let marketplaceTokenServiceObj = SERVICE_MARKETPLACE_TOKEN.find(o => o.tag === 'serviceMarketplaceToken');

                            const pathToMarketplaceTokenService = path.join(pathToServices, 'marketplaceToken');
                            fs.mkdir(getDirName(pathToMarketplaceTokenService), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToMarketplaceTokenService + '.contract.ts', marketplaceTokenServiceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create marketplace factory service
                            let marketplaceFactoryServiceObj = SERVICE_MARKETPLACE_FACTORY.find(o => o.tag === 'serviceMarketplaceFactory');

                            const pathToMarketplaceFactoryService = path.join(pathToServices, 'marketplaceFactoryService');
                            fs.mkdir(getDirName(pathToMarketplaceFactoryService), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToMarketplaceFactoryService + '.service.ts', marketplaceFactoryServiceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create marketplace token factory service
                            let marketplaceTokenFactoryServiceObj = SERVICE_MARKETPLACE_TOKEN_FACTORY.find(o => o.tag === 'serviceMarketplaceTokenFactory');

                            const pathToMarketplaceTokenFactoryService = path.join(pathToServices, 'marketplaceTokenFactoryService');
                            fs.mkdir(getDirName(pathToMarketplaceTokenFactoryService), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToMarketplaceTokenFactoryService + '.service.ts', marketplaceTokenFactoryServiceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create ItemsForSale model component
                            let itemsForSaleObj = MODELS.find(o => o.tag === 'itemsForSale');
    
                            const pathToItemsForSaleModel = path.join(pathToModels, 'itemForSale');
                            fs.mkdir(getDirName(pathToItemsForSaleModel), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToItemsForSaleModel + '.model.ts', itemsForSaleObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
    
    
                            // Create ImageTokenForSale component
                            let imageTokenForSaleObj = COMPONENT_IMAGE_TOKEN_FOR_SALE.find(o => o.tag === 'imageTokenForSale');
                            const pathToImageTokenForSaleComponent = path.join(pathToComponents, 'marketplace/imageTokenForSale/imageTokenForSale');
                            fs.mkdir(getDirName(pathToImageTokenForSaleComponent), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToImageTokenForSaleComponent + '.component.html', imageTokenForSaleObj!.html, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
    
                                fs.writeFile(pathToImageTokenForSaleComponent + '.component.ts', imageTokenForSaleObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
    
                                fs.writeFile(pathToImageTokenForSaleComponent + '.component.css', imageTokenForSaleObj!.css, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create FileTokenForSale component
                            let fileTokenForSaleObj = COMPONENT_FILE_TOKEN_FOR_SALE.find(o => o.tag === 'fileTokenForSale');
                            const pathToFileTokenForSaleComponent = path.join(pathToComponents, 'marketplace/fileTokenForSale/fileTokenForSale');
                            fs.mkdir(getDirName(pathToFileTokenForSaleComponent), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToFileTokenForSaleComponent + '.component.html', fileTokenForSaleObj!.html, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
    
                                fs.writeFile(pathToFileTokenForSaleComponent + '.component.ts', fileTokenForSaleObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
    
                                fs.writeFile(pathToFileTokenForSaleComponent + '.component.css', fileTokenForSaleObj!.css, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create marketplace component
                            let marketplaceObj = COMPONENT_MARKETPLACE.find(o => o.tag === 'marketplace');
                            const pathToMarketplaceComponent = path.join(pathToComponents, 'marketplace/marketplace');
                            fs.mkdir(getDirName(pathToMarketplaceComponent), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToMarketplaceComponent + '.component.html', marketplaceObj!.html, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
    
                                fs.writeFile(pathToMarketplaceComponent + '.component.ts', marketplaceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create resolver nftList
                            let resolverNftListObj = RESOLVER_NFT_LIST.find(o => o.tag === 'resolverNFTList');
                            const pathToResolverNftList = path.join(pathToResolvers, 'nftList');
                            fs.mkdir(getDirName(pathToResolverNftList), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
    
                                fs.writeFile(pathToResolverNftList + '.resolver.ts', resolverNftListObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                        }
                        // END MARKETPLACE

                        // START PROFILE
                        if (pickedFeatures.find(choice => choice === 'Profile')) {

                            // Create shared module
                            let profileObj = COMPONENT_PROFILE.find(o => o.tag === 'profile');
                            const pathToProfile = path.join(pathToComponents, 'profile/profile');
                            fs.mkdir(getDirName(pathToProfile), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }

                                fs.writeFile(pathToProfile + '.component.html', profileObj!.html, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });

                                fs.writeFile(pathToProfile + '.component.ts', profileObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create resolver for profile NFT list
                            let resolverProfileNftListObj = RESOLVER_PROFILE_NFT_LIST.find(o => o.tag === 'resolverProfileNFTList');
                            const pathToResolverProfileNftList = path.join(pathToResolvers, 'profileNFTList');
                            fs.mkdir(getDirName(pathToResolverProfileNftList), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }

                                fs.writeFile(pathToResolverProfileNftList + '.resolver.ts', resolverProfileNftListObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                            
                            const pathToCreateTokenChoices = path.join(pathToComponents, 'profile/createToken');
                            if (profileTokenChoices.find(choice => choice === 'Generate Image token creation Component')) {

                                // Create image token
                                let imageTokenObj = COMPONENT_CREATE_TOKEN.find(o => o.tag === 'imageToken');
                                const pathToImageToken = path.join(pathToCreateTokenChoices, 'imageToken/imageToken');
                                fs.mkdir(getDirName(pathToImageToken), { recursive: true}, function (err) {
                                    if (err) {
                                        return vscode.window.showInformationMessage(err.message);
                                    }

                                    fs.writeFile(pathToImageToken + '.component.html', imageTokenObj!.html, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });

                                    fs.writeFile(pathToImageToken + '.component.ts', imageTokenObj!.ts, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });
                                });

                                const pathToImageItemChoices = path.join(pathToComponents, 'profile/nftItem');
    
                                // Create image item component
                                let imageItemObj = COMPONENT_IMAGE_ITEM.find(o => o.tag === 'imageItem');
                                const pathToImageItem = path.join(pathToImageItemChoices, 'imageItem/imageItem');
                                fs.mkdir(getDirName(pathToImageItem), { recursive: true}, function (err) {
                                    if (err) {
                                        return vscode.window.showInformationMessage(err.message);
                                    }
    
                                    fs.writeFile(pathToImageItem + '.component.html', imageItemObj!.html, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });
    
                                    fs.writeFile(pathToImageItem + '.component.ts', imageItemObj!.ts, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });
                                });
                            }

                            if (profileTokenChoices.find(choice => choice === 'Generate File token creation Component')) {
                                
                                // Create file token
                                let fileTokenObj = COMPONENT_CREATE_TOKEN.find(o => o.tag === 'fileToken');
                                const pathToFileToken = path.join(pathToCreateTokenChoices, 'fileToken/fileToken');
                                fs.mkdir(getDirName(pathToFileToken), { recursive: true}, function (err) {
                                    if (err) {
                                        return vscode.window.showInformationMessage(err.message);
                                    }

                                    fs.writeFile(pathToFileToken + '.component.html', fileTokenObj!.html, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });

                                    fs.writeFile(pathToFileToken + '.component.ts', fileTokenObj!.ts, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });
                                });

                                const pathToNftItemChoices = path.join(pathToComponents, 'profile/nftItem');
    
                                // Create file item component
                                let fileItemObj = COMPONENT_FILE_ITEM.find(o => o.tag === 'fileItem');
                                const pathToFileItem = path.join(pathToNftItemChoices, 'fileItem/fileItem');
                                fs.mkdir(getDirName(pathToFileItem), { recursive: true}, function (err) {
                                    if (err) {
                                        return vscode.window.showInformationMessage(err.message);
                                    }
    
                                    fs.writeFile(pathToFileItem + '.component.html', fileItemObj!.html, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });
    
                                    fs.writeFile(pathToFileItem + '.component.ts', fileItemObj!.ts, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });
                                });
                            }

                            if (profileTokenChoices.find(choice => choice === 'Generate JSON token creation Component')) {
                                
                                // Create json token
                                let jsonTokenObj = COMPONENT_CREATE_TOKEN.find(o => o.tag === 'jsonToken');
                                const pathToJsonToken = path.join(pathToCreateTokenChoices, 'jsonToken/jsonToken');
                                fs.mkdir(getDirName(pathToJsonToken), { recursive: true}, function (err) {
                                    if (err) {
                                        return vscode.window.showInformationMessage(err.message);
                                    }

                                    fs.writeFile(pathToJsonToken + '.component.html', jsonTokenObj!.html, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });

                                    fs.writeFile(pathToJsonToken + '.component.ts', jsonTokenObj!.ts, function (err) {
                                        if(err) {
                                            vscode.window.showInformationMessage(err.message);
                                        }
                                    });
                                });
                            }
                        }
                        // END PROFILE

                        // START JOINED COMPONENTS PROFILE & MARKETPLACE
                        if (pickedFeatures.find(choice => choice === 'Profile' || choice === 'Marketplace')) {
                            // Create marketplace service
                            let marketplaceServiceObj = SERVICE_MARKETPLACE.find(o => o.tag === 'serviceMarketplace');

                            const pathToMarketplaceService = path.join(pathToServices, 'marketplace');
                            fs.mkdir(getDirName(pathToMarketplaceService), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToMarketplaceService + '.contract.ts', marketplaceServiceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create Property model component
                            let propertyObj = MODELS.find(o => o.tag === 'property');
    
                            const pathToPropertyModel = path.join(pathToModels, 'property');
                            fs.mkdir(getDirName(pathToPropertyModel), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToPropertyModel + '.model.ts', propertyObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create NFT model component
                            let nftObj = MODELS.find(o => o.tag === 'nft');
    
                            const pathToNFTModel = path.join(pathToModels, 'NFT');
                            fs.mkdir(getDirName(pathToNFTModel), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToNFTModel + '.model.ts', nftObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create Solidity contracts
                            let marketplaceContractObj = CONTRACT_MARKETPLACE.find(o => o.tag === 'marketplace');
                            const pathToContracts = path.join(baseProjectFolder, 'contracts');
                            const pathToMarketplaceContract = path.join(pathToContracts, 'Marketplace');
                            fs.mkdir(getDirName(pathToMarketplaceContract), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToMarketplaceContract + '.sol', marketplaceContractObj!.sol, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                            
                            let marketplaceTokenContractObj = CONTRACT_MARKETPLACE_TOKEN.find(o => o.tag === 'marketplaceToken');
                            const pathToMarketplaceTokenContract = path.join(pathToContracts, 'MarketplaceToken');
                            fs.mkdir(getDirName(pathToMarketplaceTokenContract), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToMarketplaceTokenContract + '.sol', marketplaceTokenContractObj!.sol, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                            
                            let migrationContractObj = CONTRACT_MIGRATIONS.find(o => o.tag === 'migrations');
                            const pathToMigrationsContract = path.join(pathToContracts, 'Migrations');
                            fs.mkdir(getDirName(pathToMigrationsContract), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToMigrationsContract + '.sol', migrationContractObj!.sol, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create truffle config file
                            let truffleConfigObj = CONFIG_TRUFFLE.find(o => o.tag === 'configTruffle');

                            fs.mkdir(getDirName(pathToConfigTruffle), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToConfigTruffle + '.js', truffleConfigObj!.js, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                            
                            let initialMigrationsObj = JS_MIGRATIONS.find(o => o.tag === 'initialMigration');

                            const pathToInitialMigration = path.join(pathToMigrations, '1_initial_migration');
                            fs.mkdir(getDirName(pathToInitialMigration), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToInitialMigration + '.js', initialMigrationsObj!.js, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            let tokenMigrationsObj = JS_MIGRATIONS.find(o => o.tag === 'tokenMigration');

                            const pathToTokenMigration = path.join(pathToMigrations, '2_token_migration');
                            fs.mkdir(getDirName(pathToTokenMigration), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToTokenMigration + '.js', tokenMigrationsObj!.js, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                        }
                        // END JOINED COMPONENTS PROFILE & MARKETPLACE
                        
                        // START JOINED COMPONENTS NAVBAR & FOOTER
                        if (pickedFeatures.find(choice => choice === 'Navigation bar' || choice === 'Footer')) {
                            // Create shared module
                            let sharedModuleObj = SHARED_MODULE.find(o => o.tag === 'sharedModule');
                            const pathToSharedModule = path.join(pathToShared, 'shared');
                            fs.mkdir(getDirName(pathToSharedModule), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }

                                fs.writeFile(pathToSharedModule + '.module.ts', sharedModuleObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                        }
                        // END JOINED COMPONENTS NAVBAR & FOOTER

                        // START COMPONENT FOOTER
                        if (pickedFeatures.find(choice => choice === 'Footer')) {
                            // Create shared footer
                            let sharedFooterObj = SHARED_FOOTER.find(o => o.tag === 'sharedFooter');
                            const pathToSharedFooter = path.join(pathToShared, 'footer/footer');
                            fs.mkdir(getDirName(pathToSharedFooter), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToSharedFooter + '.component.html', sharedFooterObj!.html, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });

                                fs.writeFile(pathToSharedFooter + '.component.ts', sharedFooterObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });
                        }
                        // END COMPONENT FOOTER

                        // START COMPONENT NAVBAR
                        if (pickedFeatures.find(choice => choice === 'Navigation bar')) {
                            // Create shared navbar
                            let sharedNavbarObj = SHARED_NAVBAR.find(o => o.tag === 'sharedNavbar');
                            const pathToSharedNavbar = path.join(pathToShared, 'navbar/navbar');
                            fs.mkdir(getDirName(pathToSharedNavbar), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                
                                fs.writeFile(pathToSharedNavbar + '.component.html', sharedNavbarObj!.html, function (err) {
                                    if (err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
    
                                fs.writeFile(pathToSharedNavbar + '.component.ts', sharedNavbarObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create menu service
                            let menuServiceObj = SERVICE_MENU.find(o => o.tag === 'serviceMenu');
    
                            const pathToMenuService = path.join(pathToServices, 'menu');
                            fs.mkdir(getDirName(pathToMenuService), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToMenuService + '.service.ts', menuServiceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                            // Create service resolver
                            let resolveLoaderServiceObj = SERVICE_RESOLVE_LOADER.find(o => o.tag === 'serviceResolveLoader');
    
                            const pathToResolveLoaderService = path.join(pathToServices, 'resolveLoader');
                            fs.mkdir(getDirName(pathToResolveLoaderService), { recursive: true}, function (err) {
                                if (err) {
                                    return vscode.window.showInformationMessage(err.message);
                                }
                                fs.writeFile(pathToResolveLoaderService + '.service.ts', resolveLoaderServiceObj!.ts, function (err) {
                                    if(err) {
                                        vscode.window.showInformationMessage(err.message);
                                    }
                                });
                            });

                        }
                        // END COMPONENT NAVBAR

                    });

                } else {
                    console.log(chosenComponent);   
                }
            });
        }
    });
}