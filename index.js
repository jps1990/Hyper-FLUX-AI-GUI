let currentLanguage = 'en';
    let apiToken = '';
    let controller = null;
	let manualSeed = false;


    
    // Translations (versions anglaise et française)
    const translations = {
        en: {
            title: "Multi HyperFLUX Ai Studio",
            model_label: "Model:",
            prompt_label: "Prompt:",
            stop_btn: "Stop",
            download_btn: "Download",
            download_as_btn: "Download As",
            generate_btn: "Generate",
            aspect_ratio_label: "Aspect Ratio:",
            aspect_1_1: "1:1 (Square)",
            aspect_16_9: "16:9 (Wide Screen)",
            aspect_21_9: "21:9 (Ultra Wide)",
            aspect_3_2: "3:2 (Photo)",
            aspect_2_3: "2:3 (Portrait)",
            aspect_4_5: "4:5 (Instagram)",
            aspect_5_4: "5:4 (Print)",
            aspect_3_4: "3:4 (Medium Portrait)",
            aspect_4_3: "4:3 (Standard TV/Photo)",
            aspect_9_16: "9:16 (Vertical Video)",
            aspect_9_21: "9:21 (Ultra-Portrait Cinema)",
            aspect_custom: "Custom",
            width_label: "Width:",
            height_label: "Height:",
            api_token_section: "API Token Management",
            api_token_label: "Replicate API Token:",
            save_token_btn: "Save Token",
            edit_token_btn: "Edit Token",
            saved_prompts_section: "Saved Prompts",
            save_prompt_btn: "Save Prompt",
            saved_lora_links_section: "Saved Lora Links",
            save_lora_link_btn: "Save Lora Link",
            seed_label: "Seed : (0 To 4294967295) Random=0:",
            save_seed_alert: "Seed saved successfully.",
            seed_delete_error_alert: "Error deleting the seed.",
            seed_delete_confirm: "Do you want to delete this seed?",
            loading_message: "Generating your futuristic image...",
            output_placeholder: "Your generated image will appear here",
            language_toggle_btn: "Français",
            footer: "Made by JP Sunboom",
            disable_safety_checker: "Disable safety checker",
            num_outputs: "Number of outputs",
            num_inference_steps: "Number of inference steps",
            guidance_scale: "Guidance Scale",
            output_format: "Output format",
            output_quality: "Output quality",
            lora_scale: "Lora Scale",
            prompt_strength: "Prompt Strength",
            extra_lora: "Extra Lora",
            extra_lora_scale: "Extra Lora Scale",
            sub_model: "Sub-model",
            width_placeholder: "256-1440",
            height_placeholder: "256-1440",
            save_error_alert: "Error saving prompt, seed, or API token.",
            generation_error: "Error",
            prompt_placeholder: "Describe your futuristic image",
            api_token_placeholder: "Enter your API token",
            lora_placeholder: "Enter Lora link",
            lora_link_saved_alert: "Lora link saved successfully.",
            lora_delete_error_alert: "Error deleting Lora link.",
            prompt_delete_error_alert: "Error deleting prompt.",
            prompt_delete_confirm: "Do you want to delete this prompt?",
            lora_delete_confirm: "Do you want to delete this Lora link?",
			saved_seeds_section: "Saved Seeds",
			save_seed_btn: "Save Seed",
			edit_lora_link_btn: "Edit Lora Link",
			get_token_btn: "Get API Token"
        },
        fr: {
            title: "Multi HyperFLUX Ai Studio",
            model_label: "Modèle :",
            prompt_label: "Prompt :",
            stop_btn: "Arrêter",
            download_btn: "Télécharger",
            download_as_btn: "Télécharger sous",
            generate_btn: "Créer",
            aspect_ratio_label: "Aspect Ratio :",
            aspect_1_1: "1:1 (Carré)",
            aspect_16_9: "16:9 (Écran large)",
            aspect_21_9: "21:9 (Ultra large)",
            aspect_3_2: "3:2 (Photo)",
            aspect_2_3: "2:3 (Portrait)",
            aspect_4_5: "4:5 (Instagram)",
            aspect_5_4: "5:4 (Impression)",
            aspect_3_4: "3:4 (Portrait moyen)",
            aspect_4_3: "4:3 (Standard TV/Photo)",
            aspect_9_16: "9:16 (Vidéo verticale)",
            aspect_9_21: "9:21 (Cinéma ultra-portrait)",
            aspect_custom: "Personnalisé",
            width_label: "Largeur :",
            height_label: "Hauteur :",
            api_token_section: "Gestion du Token API",
            api_token_label: "Token API Replicate :",
            save_token_btn: "Enregistrer le Token",
            edit_token_btn: "Modifier le Token",
            saved_prompts_section: "Prompts Sauvegardés",
            save_prompt_btn: "Sauvegarder Prompt",
            saved_lora_links_section: "Lora Links Sauvegardés",
            save_lora_link_btn: "Sauvegarder Lora Link",
            seed_label: "Seed : (0 à 4294967295) Random=0",
            save_seed_alert: "Seed sauvegardée avec succès.",
            seed_delete_error_alert: "Erreur lors de la suppression de la seed.",
            seed_delete_confirm: "Voulez-vous supprimer cette seed?",
            loading_message: "Génération de votre image futuriste...",
            output_placeholder: "Votre image générée apparaîtra ici",
            language_toggle_btn: "English",
            footer: "Fait par JP Sunboom",
            disable_safety_checker: "Désactiver le vérificateur de sécurité",
            num_outputs: "Nombre de sorties",
            num_inference_steps: "Nombre de pas d'inférence",
            guidance_scale: "Guidance Scale",
            output_format: "Format de sortie",
            output_quality: "Qualité de sortie",
            lora_scale: "Lora Scale",
            prompt_strength: "Force du prompt",
            extra_lora: "Extra Lora",
            extra_lora_scale: "Échelle Extra Lora",
            sub_model: "Sous-modèle",
            width_placeholder: "256-1440",
            height_placeholder: "256-1440",
            save_error_alert: "Erreur lors de la sauvegarde du prompt, seed ou token API.",
            generation_error: "Erreur",
            prompt_placeholder: "Décris ton image futuriste",
            api_token_placeholder: "Entrez votre token API",
            lora_placeholder: "Entrez le lien Lora",
            lora_link_saved_alert: "Lien Lora sauvegardé avec succès.",
            lora_delete_error_alert: "Erreur lors de la suppression du lien Lora.",
            prompt_delete_error_alert: "Erreur lors de la suppression du prompt.",
            prompt_delete_confirm: "Voulez-vous supprimer ce prompt ?",
            lora_delete_confirm: "Voulez-vous supprimer ce lien Lora ?",
			saved_seeds_section: "Seeds Sauvegardées",
			save_seed_btn: "Sauvegarder Seed",
			edit_lora_link_btn: "Modifier Lora Link",
			get_token_btn: "Obtenir le Token API"
        }
    };

   // Configuration des entrées des modèles
	const MODEL_INPUTS = {
		'flux-16step': [
			{ name: 'num_outputs', type: 'integer', min: 1, max: 4, default: 1, label: 'num_outputs' },
			{ name: 'num_inference_steps', type: 'integer', min: 1, max: 30, default: 16, label: 'num_inference_steps' },
			{ name: 'guidance_scale', type: 'number', min: 0, max: 10, step: 0.1, default: 3.5, label: 'guidance_scale' },
			{ name: 'output_format', type: 'enum', options: ['webp', 'jpg', 'png'], default: 'jpg', label: 'output_format' },
			{ name: 'output_quality', type: 'integer', min: 0, max: 100, default: 95, label: 'output_quality' },
			{ name: 'seed', type: 'integer', label: 'seed' },
			{ name: 'disable_safety_checker', type: 'boolean', default: true, label: 'disable_safety_checker' }
		],
		'flux-8step': [
			{ name: 'num_outputs', type: 'integer', min: 1, max: 4, default: 1, label: 'num_outputs' },
			{ name: 'num_inference_steps', type: 'integer', min: 1, max: 30, default: 8, label: 'num_inference_steps' },
			{ name: 'guidance_scale', type: 'number', min: 0, max: 10, step: 0.1, default: 3.5, label: 'guidance_scale' },
			{ name: 'output_format', type: 'enum', options: ['webp', 'jpg', 'png'], default: 'jpg', label: 'output_format' },
			{ name: 'output_quality', type: 'integer', min: 0, max: 100, default: 95, label: 'output_quality' },
			{ name: 'seed', type: 'integer', label: 'seed' },
			{ name: 'disable_safety_checker', type: 'boolean', default: true, label: 'disable_safety_checker' }
		],
		'flux-schnell': [
			{ name: 'num_outputs', type: 'integer', min: 1, max: 4, default: 1, label: 'num_outputs' },
			{ name: 'num_inference_steps', type: 'integer', min: 1, max: 4, default: 4, label: 'num_inference_steps' },
			{ name: 'guidance_scale', type: 'number', min: 0, max: 10, step: 0.1, default: 3.5, label: 'guidance_scale' },
			{ name: 'output_format', type: 'enum', options: ['webp', 'jpg', 'png'], default: 'jpg', label: 'output_format' },
			{ name: 'output_quality', type: 'integer', min: 0, max: 100, default: 95, label: 'output_quality' },
			{ name: 'seed', type: 'integer', label: 'seed' },
			{ name: 'disable_safety_checker', type: 'boolean', default: true, label: 'disable_safety_checker' }
		],
		'flux-mjv3': [
			{ name: 'num_outputs', type: 'integer', min: 1, max: 4, default: 1, label: 'num_outputs' },
			{ name: 'num_inference_steps', type: 'integer', min: 1, max: 50, default: 28, label: 'num_inference_steps' },
			{ name: 'guidance_scale', type: 'number', min: 0, max: 10, step: 0.1, default: 3.5, label: 'guidance_scale' },
			{ name: 'output_format', type: 'enum', options: ['webp', 'jpg', 'png'], default: 'jpg', label: 'output_format' },
			{ name: 'output_quality', type: 'integer', min: 0, max: 100, default: 95, label: 'output_quality' },
			{ name: 'seed', type: 'integer', label: 'seed' },
			{ name: 'disable_safety_checker', type: 'boolean', default: true, label: 'disable_safety_checker' },
			{ name: 'sub_model', type: 'enum', options: ['dev', 'schnell'], default: 'dev', label: 'sub_model' },
			{ name: 'mask', type: 'string', label: 'mask' },
			{ name: 'image', type: 'string', label: 'image' },
			{ name: 'extra_lora', type: 'string', label: 'extra_lora' },
			{ name: 'lora_scale', type: 'number', min: -1, max: 2, step: 0.1, default: 1, label: 'lora_scale' },
			{ name: 'prompt_strength', type: 'number', min: 0, max: 1, step: 0.1, default: 0.8, label: 'prompt_strength' },
			{ name: 'extra_lora_scale', type: 'number', min: -1, max: 2, step: 0.1, default: 1, label: 'extra_lora_scale' }
		],
		'flux-pro': [
			{ name: 'num_outputs', type: 'integer', min: 1, max: 4, default: 1, label: 'num_outputs' },
			{ name: 'num_inference_steps', type: 'integer', min: 1, max: 50, default: 25, label: 'num_inference_steps' },
			{ name: 'guidance_scale', type: 'number', min: 0, max: 15, step: 0.1, default: 5.0, label: 'guidance_scale' },
			{ name: 'output_format', type: 'enum', options: ['webp', 'jpg', 'png'], default: 'png', label: 'output_format' },
			{ name: 'output_quality', type: 'integer', min: 0, max: 100, default: 100, label: 'output_quality' },
			{ name: 'seed', type: 'integer', label: 'seed' },
			{ name: 'disable_safety_checker', type: 'boolean', default: true, label: 'disable_safety_checker' }
		],
		'flux-dev': [
			{ name: 'num_outputs', type: 'integer', min: 1, max: 6, default: 1, label: 'num_outputs' },
			{ name: 'num_inference_steps', type: 'integer', min: 1, max: 100, default: 50, label: 'num_inference_steps' },
			{ name: 'guidance_scale', type: 'number', min: 0, max: 20, step: 0.1, default: 7.5, label: 'guidance_scale' },
			{ name: 'output_format', type: 'enum', options: ['webp', 'jpg', 'png'], default: 'jpg', label: 'output_format' },
			{ name: 'output_quality', type: 'integer', min: 0, max: 100, default: 95, label: 'output_quality' },
			{ name: 'seed', type: 'integer', label: 'seed' },
			{ name: 'disable_safety_checker', type: 'boolean', default: true, label: 'disable_safety_checker' },
			{ name: 'image', type: 'string', label: 'image' },
			{ name: 'go_fast', type: 'boolean', default: true, label: 'go_fast' },
			{ name: 'megapixels', type: 'string', options: ['1', '0.25'], default: '1', label: 'megapixels' }
		]
    };


    // Fonction de mise à jour de la langue
	function updateLanguage(language) {
		// Mise à jour des textes traduits pour chaque élément ayant l'attribut [data-i18n]
		document.querySelectorAll('[data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (translations[language][key]) {
				el.textContent = translations[language][key];
			}

			if (el.hasAttribute('data-i18n-placeholder')) {
				const placeholderKey = el.getAttribute('data-i18n-placeholder');
				if (translations[language][placeholderKey]) {
					el.setAttribute('placeholder', translations[language][placeholderKey]);
				}
			}
		});

		// Mise à jour des placeholders pour les champs d'entrée spécifiques (prompt, Lora, et token API)
		const promptInput = document.getElementById('prompt');
		const apiTokenInput = document.getElementById('apiToken');
		const loraInput = document.getElementById('extra_lora');

		if (promptInput) promptInput.placeholder = translations[language].prompt_placeholder;
		if (apiTokenInput) {
			apiTokenInput.placeholder = translations[language].api_token_placeholder;
			// On ne modifie pas ici la valeur ou les propriétés du champ apiTokenInput
		}
		if (loraInput) loraInput.placeholder = translations[language].lora_placeholder;

		// Gestion des placeholders spécifiques aux dimensions personnalisées
		const widthInput = document.getElementById('width');
		const heightInput = document.getElementById('height');
		if (widthInput && heightInput) {
			widthInput.placeholder = translations[language].width_placeholder;
			heightInput.placeholder = translations[language].height_placeholder;
		}

		// Mettre à jour les options des sélecteurs (menus déroulants)
		document.querySelectorAll('select').forEach(select => {
			const selectedOption = select.value;
			select.querySelectorAll('option').forEach(option => {
				const key = option.getAttribute('data-i18n');
				if (translations[language][key]) {
					option.textContent = translations[language][key];
				}
			});
			// Restaurer la sélection
			select.value = selectedOption;
		});

		// Traduire les options des modèles après avoir mis à jour les textes principaux
		translateModelOptions(language);
	}


    // Fonction pour traduire les options des modèles
    function translateModelOptions(language) {
        document.querySelectorAll('#modelOptions label').forEach(label => {
            const key = label.getAttribute('data-i18n');
            if (translations[language][key]) {
                label.textContent = translations[language][key] + ': ';
            }
        });

        document.querySelectorAll('#modelOptions select option').forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (translations[language][key]) {
                option.textContent = translations[language][key];
            }
        });
    }

    // Gestion du bouton de changement de langue
    document.getElementById('languageToggleBtn').addEventListener('click', function () {
        // Alterne entre anglais ('en') et français ('fr') lorsque le bouton est cliqué
        currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
        updateLanguage(currentLanguage);
    });

    // Configuration initiale de la langue lors du chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        updateLanguage(currentLanguage);
        console.log("Langue initialisée au chargement de la page");

        const modelSelect = document.getElementById('model');

        if (modelSelect) {
            // Ajoute un écouteur sur le changement de modèle
            modelSelect.addEventListener('change', updateModelOptions);
            // Simule un événement "change" pour initialiser les options au chargement
            modelSelect.dispatchEvent(new Event('change'));
            console.log("Options du modèle initialisées au chargement de la page");
        } else {
            console.error('Élément #model introuvable.');
        }

        // Récupérer le token API de l'env via IPC
		window.electronAPI.getApiToken().then(token => {
			const apiTokenInput = document.getElementById('apiToken');
			const tokenMessage = document.getElementById('tokenMessage'); // Le conteneur pour le message

			if (token) {
				apiToken = token;
				if (apiTokenInput) {
					// Masque le token en affichant 'r8_' suivi d'étoiles
					apiTokenInput.value = 'r8_' + '*'.repeat(16); // Ajustez le nombre d'étoiles si nécessaire
					apiTokenInput.type = 'password';  // Masque le token
					apiTokenInput.readOnly = true;  // Rend l'input non modifiable
				}
				// Afficher un message de succès dans l'UI sans utiliser de boîte d'alerte
				tokenMessage.style.color = 'green';
				tokenMessage.textContent = 'Token API récupéré avec succès.';
			} else {
				// En cas d'erreur ou si le token n'existe pas, affiche un message d'erreur
				tokenMessage.style.color = 'red';
				tokenMessage.textContent = 'Token API introuvable ou non valide.';
			}
		}).catch(error => {
			const tokenMessage = document.getElementById('tokenMessage');
			tokenMessage.style.color = 'red';
			tokenMessage.textContent = 'Erreur lors de la récupération du token API.';
			console.error('Erreur lors de la récupération du token API :', error);
		});



        // Obtenir les prompts sauvegardés, Lora links et Seeds
        loadSavedPrompts();
        loadSavedLoraLinks();
        loadSavedSeeds();
		
		// Initialiser le bouton de sauvegarde Lora Link
		const saveLoraLinkBtn = document.getElementById('save_lora_link_btn');

		if (saveLoraLinkBtn) {
			saveLoraLinkBtn.addEventListener('click', async function (e) {
				e.preventDefault(); // Empêcher le rechargement de la page
				const loraLink = document.getElementById('extra_lora').value.trim();

				// Validation de l'URL
				const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
				if (!urlPattern.test(loraLink)) {
					console.log(translations[currentLanguage].save_error_alert || 'Veuillez entrer un lien LoRA valide.');
					// Optionnel : Afficher une notification non bloquante ici
					return;
				}

				try {
					// Appel de la fonction pour sauvegarder le lien LoRA
					await window.electronAPI.saveLoraLink(loraLink);
					console.log(translations[currentLanguage].lora_link_saved_alert || 'Lien LoRA sauvegardé avec succès.');
					loadSavedLoraLinks(); // Recharger la liste après avoir sauvegardé
					document.getElementById('extra_lora').focus(); // Recentrer le focus sur le champ de saisie
				} catch (error) {
					console.error('Erreur lors de la sauvegarde du lien LoRA :', error);
					console.log(translations[currentLanguage].save_error_alert || 'Erreur lors de la sauvegarde du lien LoRA.');
					// Optionnel : Afficher une notification d'erreur non bloquante ici
				}
			});
		} else {
			console.error('Bouton #save_lora_link_btn introuvable.');
		}

	});

    // Afficher ou masquer les dimensions personnalisées
	document.getElementById('aspect_ratio').addEventListener('change', function () {
		const customDimensions = document.getElementById('customDimensions');
		if (customDimensions) {
			if (this.value === 'custom') {
				customDimensions.style.display = 'block';
			} else {
				customDimensions.style.display = 'none';
			}
		}
	});


    // Fonction pour mettre à jour dynamiquement les options du formulaire en fonction du modèle sélectionné
	function updateModelOptions() {
		const model = document.getElementById('model').value;
		const modelOptionsDiv = document.getElementById('modelOptions');
		const modelMessageDiv = document.getElementById('model-message'); // Conteneur pour le message

		if (!modelOptionsDiv) {
			console.error("L'élément modelOptions n'existe pas dans le DOM");
			return;
		}

		// Sauvegarder les valeurs actuelles de la seed et du Safety Checker
		const seedValue = document.getElementById('seed_textbox') ? document.getElementById('seed_textbox').value : '';
		const safetyCheckerValue = document.getElementById('disable_safety_checker') ? document.getElementById('disable_safety_checker').checked : false;

		// Vider les options précédentes
		modelOptionsDiv.innerHTML = '';
		if (modelMessageDiv) {
			modelMessageDiv.style.display = 'none'; // Masquer le message par défaut
		}

		const options = MODEL_INPUTS[model];
		if (!options) {
			console.error(`Aucune option trouvée pour le modèle ${model}`);
			return;
		}

		console.log(`Mise à jour des options pour le modèle: ${model}`);

		// Message spécifique pour le modèle flux-mjv3
		const fluxMjv3Message = "Flux lora trained on Midjourney v3 outputs from 2022, use 'a dream, in the style of MJV3' to trigger generation, also try increasing lora strength above 1.";

		options.forEach(option => {
			let inputElement;
			const labelElement = document.createElement('label');
			labelElement.setAttribute('for', option.name);
			labelElement.setAttribute('data-i18n', option.label);
			labelElement.textContent = `${translations[currentLanguage][option.label] || option.label}: `;

			if (option.name === 'seed') {
				// Nous ne traitons plus 'seed' ici, car nous allons l'ajouter après pour préserver sa valeur
				return;
			}

			if (option.name === 'disable_safety_checker') {
				// Nous ne traitons plus 'disable_safety_checker' ici, car nous allons l'ajouter après pour préserver sa valeur
				return;
			}

			if (option.name === 'mask' || option.name === 'image') {
				// Traitement spécifique pour les champs 'mask' et 'image'
				inputElement = document.createElement('input');
				inputElement.type = 'url';
				inputElement.name = option.name;
				inputElement.id = option.name;
				inputElement.value = option.default || '';
				inputElement.placeholder = 'https://example.com/image.png';
				inputElement.style.width = '80%';

				const urlContainer = document.createElement('div');
				urlContainer.classList.add('slider-container');

				// Alignement du champ texte à droite du label
				urlContainer.appendChild(labelElement);
				urlContainer.appendChild(inputElement);
				modelOptionsDiv.appendChild(urlContainer);

			} else {
				switch (option.type) {
					case 'integer':
					case 'number':
						// Création d'un slider avec un champ texte pour les nombres
						inputElement = document.createElement('input');
						inputElement.type = 'range';
						inputElement.name = option.name;
						inputElement.id = option.name;
						inputElement.min = option.min;
						inputElement.max = option.max;
						inputElement.step = option.step || 1;
						inputElement.value = option.default || 0;
						inputElement.style.width = '80%';

						const valueDisplay = document.createElement('span');
						valueDisplay.id = `${option.name}_value`;
						valueDisplay.textContent = inputElement.value;
						valueDisplay.style.color = 'white';
						valueDisplay.style.marginLeft = '10px';

						const container = document.createElement('div');
						container.classList.add('slider-container');

						const textBox = document.createElement('input');
						textBox.type = 'number';
						textBox.style.color = 'white';
						textBox.min = option.min;
						textBox.max = option.max;
						textBox.step = option.step || 1;
						textBox.value = inputElement.value;
						textBox.style.width = '15%';

						// Synchronisation entre le slider et le champ texte
						inputElement.addEventListener('input', function () {
							textBox.value = this.value;
							valueDisplay.textContent = this.value;
						});

						textBox.addEventListener('input', function () {
							inputElement.value = this.value;
							valueDisplay.textContent = this.value;
						});

						container.appendChild(inputElement);
						container.appendChild(textBox);
						container.appendChild(valueDisplay);
						modelOptionsDiv.appendChild(labelElement);
						modelOptionsDiv.appendChild(container);
						break;

					case 'boolean':
						// Les champs boolean autres que 'disable_safety_checker'
						inputElement = document.createElement('input');
						inputElement.type = 'checkbox';
						inputElement.name = option.name;
						inputElement.id = option.name;
						inputElement.checked = option.default || false;

						const checkboxContainer = document.createElement('div');
						checkboxContainer.style.display = 'flex';
						checkboxContainer.style.alignItems = 'center';
						checkboxContainer.style.marginBottom = '10px';

						// Alignement du checkbox à droite du label
						checkboxContainer.appendChild(labelElement);
						checkboxContainer.appendChild(inputElement);

						modelOptionsDiv.appendChild(checkboxContainer);
						break;

					case 'enum':
						inputElement = document.createElement('select');
						inputElement.name = option.name;
						inputElement.id = option.name;
						option.options.forEach(opt => {
							const optionElement = document.createElement('option');
							optionElement.value = opt;
							optionElement.setAttribute('data-i18n', opt);
							optionElement.textContent = translations[currentLanguage][opt] || opt;
							inputElement.appendChild(optionElement);
						});
						inputElement.value = option.default || option.options[0];
						inputElement.style.width = '80%';

						const selectContainer = document.createElement('div');
						selectContainer.classList.add('slider-container');

						// Alignement du select à droite du label
						selectContainer.appendChild(labelElement);
						selectContainer.appendChild(inputElement);
						modelOptionsDiv.appendChild(selectContainer);
						break;

					case 'string':
						inputElement = document.createElement('input');
						inputElement.type = 'text';
						inputElement.name = option.name;
						inputElement.id = option.name;
						inputElement.value = option.default || '';
						inputElement.style.width = '80%';

						const stringContainer = document.createElement('div');
						stringContainer.classList.add('slider-container');

						// Alignement du champ texte à droite du label
						stringContainer.appendChild(labelElement);
						stringContainer.appendChild(inputElement);
						modelOptionsDiv.appendChild(stringContainer);
						break;
				}

				// Gestion spéciale pour l'option 'extra_lora'
				if (option.name === 'extra_lora') {
					const tooltip = document.createElement('div');
					tooltip.className = 'tooltip';
					tooltip.textContent = '?';

					const tooltipText = document.createElement('span');
					tooltipText.className = 'tooltiptext';
					tooltipText.innerHTML = `
						Formats de liens pour les LoRA :
						<br> Replicate : owner/model-name
						<br> HuggingFace : huggingface.co/owner/model-name
						<br> CivitAI : civitai.com/models/&lt;id&gt;/&lt;model-name&gt;
						<br> Autres : URL direct vers .safetensors
					`;
					tooltip.appendChild(tooltipText);
					labelElement.appendChild(tooltip);
				}
			}
		});

		// Ajouter manuellement les options pour 'seed' et 'disable_safety_checker' pour préserver leurs valeurs

		// Option pour la seed
		const seedLabel = document.createElement('label');
		seedLabel.setAttribute('for', 'seed_textbox');
		seedLabel.textContent = `${translations[currentLanguage]['seed_label'] || 'Seed'} `;

		const seedContainer = document.createElement('div');
		seedContainer.classList.add('seed-container');

		// Création du slider de seed
		const seedSlider = document.createElement('input');
		seedSlider.type = 'range';
		seedSlider.id = 'seed_slider';
		seedSlider.min = 0;
		seedSlider.max = 4294967295;
		seedSlider.step = 1;
		seedSlider.value = seedValue || 0;

		// Création de la boîte de texte pour la seed
		const seedTextBox = document.createElement('input');
		seedTextBox.type = 'number';
		seedTextBox.min = 0;
		seedTextBox.max = 4294967295;
		seedTextBox.step = 1;
		seedTextBox.value = seedValue || 0;
		seedTextBox.id = 'seed_textbox';
		seedTextBox.name = 'seed';

		// Synchronisation entre le slider et la boîte de texte avec mise à jour de manualSeed
		seedSlider.addEventListener('input', function () {
			seedTextBox.value = this.value;
			manualSeed = this.value !== '0'; // Met à jour manualSeed
		});

		seedTextBox.addEventListener('input', function () {
			seedSlider.value = this.value;
			manualSeed = this.value !== '0'; // Met à jour manualSeed
		});

		// Ajout du slider et de la boîte de texte au container
		seedContainer.appendChild(seedSlider);
		seedContainer.appendChild(seedTextBox);

		// Création du bouton "Sauvegarder Seed"
		const saveSeedBtn = document.createElement('button');
		saveSeedBtn.type = 'button';
		saveSeedBtn.id = 'save_seed_btn';
		saveSeedBtn.textContent = translations[currentLanguage].save_seed_btn || 'Sauvegarder Seed';
		saveSeedBtn.style.marginTop = '10px';

		// Ajout du bouton au container
		seedContainer.appendChild(saveSeedBtn);

		// Ajout de l'écouteur d'événement pour le bouton de sauvegarde
		saveSeedBtn.addEventListener('click', async () => {
			const seedValue = seedTextBox.value;
			await saveSeedManually(seedValue);
		});

		// Ajout du label et du container au div des options du modèle
		modelOptionsDiv.appendChild(seedLabel);
		modelOptionsDiv.appendChild(seedContainer);

		// Option pour 'disable_safety_checker'
		const safetyLabel = document.createElement('label');
		safetyLabel.setAttribute('for', 'disable_safety_checker');
		safetyLabel.textContent = `${translations[currentLanguage]['disable_safety_checker_label'] || 'Désactiver le Safety Checker'}: `;

		const safetyInput = document.createElement('input');
		safetyInput.type = 'checkbox';
		safetyInput.name = 'disable_safety_checker';
		safetyInput.id = 'disable_safety_checker';
		safetyInput.checked = safetyCheckerValue;

		const safetyContainer = document.createElement('div');
		safetyContainer.style.display = 'flex';
		safetyContainer.style.alignItems = 'center';
		safetyContainer.style.marginBottom = '10px';

		safetyContainer.appendChild(safetyLabel);
		safetyContainer.appendChild(safetyInput);

		modelOptionsDiv.appendChild(safetyContainer);

		// Afficher le message spécifique pour flux-mjv3
		if (model === 'flux-mjv3') {
			if (modelMessageDiv) {
				modelMessageDiv.textContent = fluxMjv3Message; // Met le message dans le conteneur
				modelMessageDiv.style.display = 'block'; // Affiche le message
			}
		} else {
			if (modelMessageDiv) {
				modelMessageDiv.style.display = 'none'; // Masque le message pour d'autres modèles
			}
		}
	}






	// Fonction utilitaire pour parser les valeurs en fonction du type
	function parseInputValue(value, type) {
		if (type === 'integer') {
			return parseInt(value);
		} else if (type === 'number') {
			return parseFloat(value);
		} else if (type === 'boolean') {
			return value === true || value === 'on';
		} else {
			return value;
		}
	}

	// Fonction pour afficher/masquer le bouton en fonction du modèle sélectionné
	function updateSaveLoraLinkVisibility() {
		const modelSelect = document.getElementById('model');
		const saveLoraLinkBtn = document.getElementById('save_lora_link_btn');
		
		// Vérifie si le modèle sélectionné est 'flux-mjv3'
		if (modelSelect.value === 'flux-mjv3') {
			saveLoraLinkBtn.style.display = 'block'; // Affiche le bouton
		} else {
			saveLoraLinkBtn.style.display = 'none'; // Masque le bouton
		}
	}

	// Ajoute un événement pour détecter les changements de sélection du modèle
	document.getElementById('model').addEventListener('change', updateSaveLoraLinkVisibility);

	// Appelle la fonction au chargement initial pour s'assurer que l'état du bouton est correct
	document.addEventListener('DOMContentLoaded', updateSaveLoraLinkVisibility);

    // Fonction pour vérifier et traiter les dimensions personnalisées
	function validateCustomDimensions(aspect_ratio, formData, loadingDiv, input) {
		if (aspect_ratio === 'custom') {
			const width = formData.get('width');
			const height = formData.get('height');

			// Validation des dimensions personnalisées
			if (!width || !height || isNaN(width) || isNaN(height) || width < 256 || height < 256 || width > 1440 || height > 1440) {
				alert(translations[currentLanguage].save_error_alert || 'Veuillez entrer des dimensions valides pour la largeur et la hauteur (256-1440).');

				if (loadingDiv) {
					loadingDiv.style.display = 'none'; // Masquer le chargement en cas d'erreur
				}

				return false; // Validation échouée
			}

			// Si la validation réussit, on met à jour l'objet input avec les nouvelles dimensions
			input['width'] = parseInt(width, 10);
			input['height'] = parseInt(height, 10);
		}

		return true; // Indique que la validation a réussi
	}


    // Fonction pour sauvegarder manuellement la seed
		async function saveSeedManually(seedValue) {
		if (seedValue === '' || isNaN(seedValue) || seedValue < 0 || seedValue > 4294967295) {
			console.log(translations[currentLanguage].save_error_alert || 'Veuillez entrer une seed valide (0 à 4294967295).');
			// Optionnel : Afficher une notification non bloquante ici
			return;
		}

		try {
			// Sauvegarder la seed via IPC
			const result = await window.electronAPI.saveSeed(seedValue);
			if (result.success) {
				console.log(translations[currentLanguage].save_seed_alert || 'Seed sauvegardée avec succès.');
				loadSavedSeeds();
				// Recentrer le focus sur le champ de saisie de la seed
				const seedTextBox = document.getElementById('seed_textbox');
				if (seedTextBox) {
					seedTextBox.focus();
				}
			} else {
				throw new Error('Failed to save seed');
			}
		} catch (error) {
			console.error('Erreur lors de la sauvegarde de la seed :', error);
			console.log(translations[currentLanguage].save_error_alert || 'Erreur lors de la sauvegarde de la seed.');
			// Optionnel : Afficher une notification d'erreur non bloquante ici
		}
	}

    
	// Définir generateRandomSeed globalement comme une fonction asynchrone
	async function generateRandomSeed() {
		try {
			// Vous pouvez fournir un seed initial si nécessaire, sinon laissez vide pour un seed basé sur le temps
			return await window.electronAPI.generateRandomSeed();
		} catch (error) {
			console.error('Erreur lors de la génération de la seed:', error);
			return 0; // Valeur par défaut en cas d'erreur
		}
	}

	// Fonction pour gérer la soumission du formulaire
	document.getElementById('imageForm').addEventListener('submit', async function (e) {
		e.preventDefault();

		const loadingDiv = document.getElementById('loading');
		const outputDiv = document.getElementById('output');
		const errorMessage = document.getElementById('error-message');

		// Vérification des éléments du DOM
		if (loadingDiv && outputDiv && errorMessage) {
			loadingDiv.style.display = 'block'; // Afficher le message de chargement
			outputDiv.innerHTML = '';  // Vider la zone d'affichage pour éviter les doublons
			errorMessage.style.display = 'none';
		} else {
			console.error('Les éléments #loading, #output ou #error-message sont manquants dans le DOM.');
			return;
		}

		const formData = new FormData(this);
		const model = formData.get('model');
		const prompt = formData.get('prompt');
		const aspect_ratio = formData.get('aspect_ratio');
		const input = {}; // Stocker les valeurs d'entrée

		// Ajout du prompt à l'objet input
		if (prompt && prompt.trim() !== '') {
			input['prompt'] = prompt.trim();
		} else {
			alert(translations[currentLanguage].save_error_alert || 'Veuillez entrer un prompt.');
			loadingDiv.style.display = 'none';
			return;
		}

		// Récupérer l'état du checkbox de sécurité
		const disableSafetyCheckerElement = document.getElementById('disable_safety_checker');
		const disableSafetyChecker = disableSafetyCheckerElement ? disableSafetyCheckerElement.checked : false;
		input['disable_safety_checker'] = disableSafetyChecker;

		// Ajouter le ratio d'aspect à l'objet input
		input['aspect_ratio'] = aspect_ratio;

		// Gestion des options spécifiques au modèle sélectionné
		const options = MODEL_INPUTS[model];
		if (!options) {
			alert(`Aucune option trouvée pour le modèle sélectionné: ${model}`);
			loadingDiv.style.display = 'none';
			return;
		}

		let seedUsed = null; // Variable pour stocker la seed utilisée

		for (const option of options) {
			let value;
			if (option.type === 'boolean') {
				value = formData.get(option.name) === 'on' || formData.get(option.name) === true;
			} else {
				value = formData.get(option.name);
			}

			if (value !== null && value !== undefined && value !== '') {
				if (model === 'flux-mjv3' && option.name === 'sub_model') {
					input['model'] = parseInputValue(value, option.type);
				} else if (option.name === 'seed') {
					const seedValue = parseInputValue(value, option.type);
					if (seedValue === 0) {
						seedUsed = await generateRandomSeed();
						input['seed'] = seedUsed;
						manualSeed = false; // Seed générée automatiquement
					} else {
						seedUsed = seedValue;
						input['seed'] = seedUsed;
						manualSeed = true; // Seed définie manuellement
					}
				} else {
					input[option.name] = parseInputValue(value, option.type);
				}
			}
		}

		// Gestion de l'aspect ratio personnalisé
		const isValidDimensions = validateCustomDimensions(aspect_ratio, formData, loadingDiv, input);
		if (!isValidDimensions) {
			return; // Arrêter le traitement en cas de dimensions invalides
		}

		const dataToSend = {
			model: model,
			input: input
		};

		console.log('Données envoyées à l\'API via IPC:', JSON.stringify(dataToSend, null, 2));

		// Logs pour le débogage
		console.log('Aspect Ratio:', aspect_ratio);
		if (aspect_ratio === 'custom') {
			console.log('Dimensions personnalisées:', input.width, 'x', input.height);
		}

		// Fonction asynchrone pour envoyer les données
		try {
			if (controller) {
				controller.abort(); // Annuler les requêtes précédentes si nécessaire
			}
			controller = new AbortController();

			// Appel asynchrone à l'API Electron
			const response = await window.electronAPI.runReplicateModel(dataToSend);

			if (response.error) {
				throw new Error(response.error);
			}

			// Traitement de la réponse
			if (response.output) {
				outputDiv.innerHTML = ''; // Vider le contenu de la sortie précédente

				const outputs = Array.isArray(response.output) ? response.output : [response.output];
				// Utiliser la seed que nous avons envoyée
				const seeds = outputs.map(() => seedUsed);

				for (const [index, imageUrl] of outputs.entries()) {
					// Obtenir la seed correspondante à l'image
					const seed = seeds[index];

					// Création du conteneur pour l'image et les boutons
					const imageContainer = document.createElement('div');
					imageContainer.classList.add('image-container');

					// Si c'est la première image, afficher la seed et le bouton 'Sauvegarder Seed'
					if (index === 0) {
						// Création du conteneur pour la seed et le bouton
						const seedContainer = document.createElement('div');
						seedContainer.classList.add('seed-container');

						// Création du paragraphe affichant la seed
						const seedParagraph = document.createElement('p');
						seedParagraph.textContent = `${translations[currentLanguage].seed_label} ${seed}`;
						seedParagraph.classList.add('seed-text');

						// Création du bouton "Sauvegarder Seed"
						const saveSeedButton = document.createElement('button');
						saveSeedButton.textContent = translations[currentLanguage].save_seed_btn || 'Sauvegarder Seed';
						saveSeedButton.classList.add('save-seed-button');

						saveSeedButton.addEventListener('click', async () => {
							await saveSeedManually(seed); // Sauvegarde la seed avec la fonction existante
							alert(translations[currentLanguage].save_seed_alert || 'Seed sauvegardée avec succès.');
						});

						// Ajouter le paragraphe et le bouton au seedContainer
						seedContainer.appendChild(seedParagraph);
						seedContainer.appendChild(saveSeedButton);

						// Ajouter le seedContainer au imageContainer
						imageContainer.appendChild(seedContainer);
					}

					// Création de l'image générée
					const imageElement = document.createElement('img');
					imageElement.src = imageUrl;
					imageElement.alt = `Generated image ${index + 1}`;
					imageElement.id = `image_${index + 1}`;
					imageElement.style.maxWidth = '100%';
					imageElement.style.objectFit = 'contain'; // Assure que l'image garde son ratio
					imageElement.style.display = 'block';

					// Ajouter l'image au conteneur
					imageContainer.appendChild(imageElement);

					// Création du bouton de téléchargement individuel
					const downloadButton = document.createElement('button');
					downloadButton.textContent = translations[currentLanguage].download_btn || 'Télécharger';
					downloadButton.classList.add('download-button');

					downloadButton.addEventListener('click', function () {
						downloadImage(imageUrl, index);
					});

					// Ajouter le bouton de téléchargement sous l'image
					imageContainer.appendChild(downloadButton);

					// Ajouter le conteneur au div de sortie
					outputDiv.appendChild(imageContainer);
				}
			} else {
				outputDiv.innerHTML = `<p style="color: red;">${translations[currentLanguage].generation_error}</p>`;
			}

			loadingDiv.style.display = 'none';

		} catch (error) {
			console.error("Erreur lors de l'envoi des données :", error);
			if (loadingDiv && outputDiv) {
				loadingDiv.style.display = 'none';
				outputDiv.innerHTML = `<p style="color: red;">${translations[currentLanguage].generation_error || 'Erreur'} : ${error.message}</p>`;
			}
		}
	});


	// Listener pour la réponse de Replicate
	window.electronAPI.receive('replicate-response', async (data) => {
		const loadingDiv = document.getElementById('loading');
		const outputDiv = document.getElementById('output');

		if (loadingDiv) {
			loadingDiv.style.display = 'none'; // Masquer le div de chargement après la génération
		}

		if (data.error) {
			if (outputDiv) {
				outputDiv.innerHTML = `<p style="color: red;">${translations[currentLanguage].generation_error}: ${data.error}</p>`;
			}
		} else if (data.output) {
			if (outputDiv) {
				outputDiv.innerHTML = ''; // Vider le contenu de la sortie précédente

				const outputs = Array.isArray(data.output) ? data.output : [data.output];
				// Si data.seeds est un tableau de seeds pour chaque image, utilisez-le ; sinon, utilisez data.seed pour toutes les images
				const seeds = Array.isArray(data.seeds) ? data.seeds : outputs.map(() => data.seed);

				for (const [index, imageUrl] of outputs.entries()) {
					// Obtenir la seed correspondante à l'image
					const seed = seeds[index] !== undefined && seeds[index] !== null ? seeds[index] : await generateRandomSeed();
					const seedText = `${translations[currentLanguage].seed_label} ${seed}`;

					// Création du conteneur pour l'image et la seed
					const imageContainer = document.createElement('div');
					imageContainer.classList.add('image-container');

					// Création du conteneur pour la seed et le bouton
					const seedContainer = document.createElement('div');
					seedContainer.classList.add('seed-container');

					// Création du paragraphe affichant la seed
					const seedParagraph = document.createElement('p');
					seedParagraph.textContent = seedText;
					seedParagraph.classList.add('seed-text');

					// Création du bouton "Sauvegarder Seed"
					const saveSeedButton = document.createElement('button');
					saveSeedButton.textContent = translations[currentLanguage].save_seed_btn || 'Sauvegarder Seed';
					saveSeedButton.classList.add('save-seed-button');

					saveSeedButton.addEventListener('click', async () => {
						await saveSeedManually(seed); // Sauvegarde la seed avec la fonction existante
						alert(translations[currentLanguage].save_seed_alert || 'Seed sauvegardée avec succès.');
					});

					// Ajouter le paragraphe et le bouton au seedContainer
					seedContainer.appendChild(seedParagraph);
					seedContainer.appendChild(saveSeedButton);

					// Ajouter le seedContainer au imageContainer
					imageContainer.appendChild(seedContainer);

					// Création de l'image générée
					const imageElement = document.createElement('img');
					imageElement.src = imageUrl;
					imageElement.alt = `Generated image ${index + 1}`;
					imageElement.id = `image_${index + 1}`;
					imageElement.style.maxWidth = '100%';
					imageElement.style.objectFit = 'contain'; // Assure que l'image garde son ratio
					imageElement.style.display = 'block';

					// Ajouter l'image au conteneur
					imageContainer.appendChild(imageElement);

					// Ajouter le conteneur au div de sortie
					outputDiv.appendChild(imageContainer);
				}
			}
		} else {
			if (outputDiv) {
				outputDiv.innerHTML = `<p style="color: red;">${translations[currentLanguage].generation_error}</p>`;
			}
		}
	});






    // Fonction pour sauvegarder le token API avec fonctionnalité toggle (Save/Edit/Delete)
	document.getElementById('editApiTokenBtn').addEventListener('click', function () {
		const apiTokenInput = document.getElementById('apiToken');
		const saveBtn = document.getElementById('saveApiTokenBtn');
		const editBtn = this;
		const tokenMessage = document.getElementById('tokenMessage'); // Le conteneur pour afficher les messages

		// Activer l'édition du token
		apiTokenInput.readOnly = false;
		apiTokenInput.value = ''; // Efface le contenu de l'input pour permettre la saisie d'un nouveau token
		apiTokenInput.type = 'text'; // Permet de voir le texte du token

		// Masquer le bouton "Modifier" et afficher le bouton "Enregistrer"
		saveBtn.style.display = 'inline-block';
		editBtn.style.display = 'none';

		// Réinitialiser le message
		tokenMessage.textContent = ''; // Efface le message si besoin
	});

		document.getElementById('saveApiTokenBtn').addEventListener('click', async function () {
		const apiTokenInput = document.getElementById('apiToken');
		const token = apiTokenInput.value.trim();
		const saveBtn = this;
		const editBtn = document.getElementById('editApiTokenBtn');
		const tokenMessage = document.getElementById('tokenMessage'); // Le conteneur pour afficher les messages

		// Validation simple pour s'assurer que le token est correct
		if (token) {
			try {
				await window.electronAPI.setApiToken(token);

				// Masquer le reste du token après l'enregistrement
				apiTokenInput.readOnly = true;
				apiTokenInput.type = 'password';
				apiTokenInput.value = 'r8_' + '*'.repeat(16); // Ajustez le nombre d'étoiles si nécessaire

				// Afficher un message de succès dans l'UI sans utiliser d'alerte
				tokenMessage.style.color = 'green';
				tokenMessage.textContent = 'Token sauvegardé avec succès.';

				// Cacher le bouton "Enregistrer" et afficher le bouton "Modifier"
				saveBtn.style.display = 'none';
				editBtn.style.display = 'inline-block';
			} catch (error) {
				// Afficher un message d'erreur en cas d'échec
				tokenMessage.style.color = 'red';
				tokenMessage.textContent = 'Erreur lors de la sauvegarde du token.';
			}
		} else {
			// Afficher un message si le token est invalide ou vide
			tokenMessage.style.color = 'red';
			tokenMessage.textContent = 'Veuillez entrer un token valide.';
		}
	});



	// Écouteur séparé pour le bouton de suppression du token API
	document.getElementById('deleteApiTokenBtn').addEventListener('click', async function () {
		const apiTokenInput = document.getElementById('apiToken');
		const tokenMessage = document.getElementById('tokenMessage'); // Le conteneur pour afficher les messages

		try {
			await window.electronAPI.deleteApiToken(); // Appel à l'API pour supprimer le token

			// Réinitialiser le champ du token et afficher un message de succès
			apiTokenInput.value = '';
			apiTokenInput.type = 'text'; // Permet de saisir un nouveau token
			apiTokenInput.readOnly = false; // Permet de modifier le champ

			tokenMessage.style.color = 'green';
			tokenMessage.textContent = 'Token supprimé avec succès.';

			// Cacher le bouton "Modifier" et afficher le bouton "Enregistrer"
			document.getElementById('editApiTokenBtn').style.display = 'none';
			document.getElementById('saveApiTokenBtn').style.display = 'inline-block';
		} catch (error) {
			// Afficher un message d'erreur en cas d'échec
			tokenMessage.style.color = 'red';
			tokenMessage.textContent = 'Erreur lors de la suppression du token.';
		}
	});



    // Fonction pour sauvegarder un nouveau Prompt
	document.getElementById('save_prompt_btn').addEventListener('click', async function (e) {
		e.preventDefault(); // Empêcher le rechargement de la page
		const prompt = document.getElementById('prompt').value.trim();
		if (prompt) {
			try {
				await window.electronAPI.savePrompt(prompt);
				console.log(translations[currentLanguage].save_prompt_alert || 'Prompt sauvegardé avec succès.');
				// Optionnel : Afficher une notification non bloquante ici
				loadSavedPrompts();
				document.getElementById('prompt').focus(); // Recentrer le focus sur le champ de saisie
			} catch (error) {
				console.error('Erreur lors de la sauvegarde du prompt :', error);
				console.log(translations[currentLanguage].save_error_alert || 'Erreur lors de la sauvegarde du prompt.');
				// Optionnel : Afficher une notification d'erreur non bloquante ici
			}
		} else {
			console.log(translations[currentLanguage].save_error_alert || 'Erreur lors de la sauvegarde du prompt.');
			// Optionnel : Afficher une notification d'erreur non bloquante ici
		}
	});


	// Fonctions pour gérer les Prompts sauvegardés
	async function loadSavedPrompts() {
		try {
			const prompts = await window.electronAPI.getPrompts();
			const promptsList = document.getElementById('savedPromptsList');

			promptsList.innerHTML = ''; // Vider la liste existante

			prompts.forEach(prompt => {
				const promptItem = document.createElement('li');
				promptItem.style.display = 'flex';
				promptItem.style.justifyContent = 'space-between';
				promptItem.style.alignItems = 'center';
				promptItem.style.color = 'var(--primary-color)'; // Texte en mauve

				const promptText = document.createElement('span');
				promptText.textContent = prompt.prompt;
				promptText.style.cursor = 'pointer';
				promptText.style.textDecoration = 'underline';
				promptText.setAttribute('data-id', prompt.id);

				// Ajouter un écouteur pour remplir le prompt lorsqu'on clique dessus
				promptText.addEventListener('click', () => {
					document.getElementById('prompt').value = prompt.prompt;
				});

				// Ajouter un bouton pour supprimer le prompt
				const deleteBtn = document.createElement('button');
				deleteBtn.type = 'button'; // Empêcher la soumission du formulaire
				deleteBtn.textContent = 'X';
				deleteBtn.style.cursor = 'pointer';
				deleteBtn.style.backgroundColor = 'var(--primary-color)'; // Bouton en mauve
				deleteBtn.style.color = 'white';
				deleteBtn.style.border = 'none';
				deleteBtn.style.borderRadius = '50%';
				deleteBtn.style.width = '20px';
				deleteBtn.style.height = '20px';
				deleteBtn.style.fontSize = '12px';

				deleteBtn.addEventListener('click', async (e) => {
					e.stopPropagation(); // Empêcher l'événement de clic de se propager
					try {
						const result = await window.electronAPI.deletePrompt(prompt.id);
						if (result.success) {
							loadSavedPrompts(); // Recharger la liste
							document.getElementById('prompt').focus(); // Recentrer le focus sur le champ de saisie
						} else {
							console.log(translations[currentLanguage].prompt_delete_error_alert || 'Erreur lors de la suppression du prompt.');
							// Optionnel : Afficher une notification ici
						}
					} catch (error) {
						console.error('Erreur lors de la suppression du prompt :', error);
						console.log(translations[currentLanguage].prompt_delete_error_alert || 'Erreur lors de la suppression du prompt.');
						// Optionnel : Afficher une notification ici
					}
				});




				promptItem.appendChild(promptText);
				promptItem.appendChild(deleteBtn);
				promptsList.appendChild(promptItem);
			});
		} catch (error) {
			console.error('Erreur lors du chargement des prompts :', error);
			console.log(translations[currentLanguage].save_error_alert || 'Erreur lors du chargement des prompts.');
		}
		
	}


	// Fonctions pour gérer les Lora Links sauvegardés
	async function loadSavedLoraLinks() {
		try {
			const loraLinks = await window.electronAPI.getLoraLinks();
			const loraLinksList = document.getElementById('savedLoraLinksList');

			loraLinksList.innerHTML = ''; // Vider la liste existante

			loraLinks.forEach(link => {
				const linkItem = document.createElement('li');
				linkItem.style.display = 'flex';
				linkItem.style.justifyContent = 'space-between';
				linkItem.style.alignItems = 'center';
				linkItem.style.color = 'var(--primary-color)'; // Texte en mauve

				const linkText = document.createElement('span');
				linkText.textContent = link.link;
				linkText.style.cursor = 'pointer';
				linkText.style.textDecoration = 'underline';
				linkText.setAttribute('data-id', link.id);

				// Ajouter un écouteur pour remplir le Lora link lorsqu'on clique dessus
				linkText.addEventListener('click', () => {
					document.getElementById('extra_lora').value = link.link;
				});

				// Ajouter un bouton pour supprimer le lora link
				const deleteBtn = document.createElement('button');
				deleteBtn.type = 'button'; // Empêcher la soumission du formulaire
				deleteBtn.textContent = 'X';
				deleteBtn.style.cursor = 'pointer';
				deleteBtn.style.backgroundColor = 'var(--primary-color)'; // Bouton en mauve
				deleteBtn.style.color = 'white';
				deleteBtn.style.border = 'none';
				deleteBtn.style.borderRadius = '50%';
				deleteBtn.style.width = '20px';
				deleteBtn.style.height = '20px';
				deleteBtn.style.fontSize = '12px';

				deleteBtn.addEventListener('click', async (e) => {
					e.stopPropagation(); // Empêcher l'événement de clic de se propager
					try {
						const result = await window.electronAPI.deleteLoraLink(link.id);
						if (result.success) {
							loadSavedLoraLinks(); // Recharger la liste
							document.getElementById('extra_lora').focus(); // Recentrer le focus sur le champ de saisie
						} else {
							console.log(translations[currentLanguage].lora_delete_error_alert || 'Erreur lors de la suppression du lien LoRA.');
						}
					} catch (error) {
						console.error('Erreur lors de la suppression du lien LoRA :', error);
						console.log(translations[currentLanguage].lora_delete_error_alert || 'Erreur lors de la suppression du lien LoRA.');
					}
				});

				linkItem.appendChild(linkText);
				linkItem.appendChild(deleteBtn);
				loraLinksList.appendChild(linkItem);
			});
		} catch (error) {
			console.error('Erreur lors du chargement des liens LoRA :', error);
			console.log(translations[currentLanguage].save_error_alert || 'Erreur lors du chargement des liens LoRA.');
		}
		
	}


	// Fonctions pour gérer les Seeds sauvegardées
	async function loadSavedSeeds() {
		try {
			const seeds = await window.electronAPI.getSeeds() || [];
			const seedsList = document.getElementById('savedSeedsList');

			seedsList.innerHTML = ''; // Vider la liste existante

			seeds.forEach(seed => {
				const seedItem = document.createElement('li');
				seedItem.style.display = 'flex';
				seedItem.style.justifyContent = 'space-between';
				seedItem.style.alignItems = 'center';
				seedItem.style.color = 'var(--primary-color)'; // Texte en mauve

				const seedText = document.createElement('span');
				seedText.textContent = seed.value;
				seedText.style.cursor = 'pointer';
				seedText.style.textDecoration = 'underline';
				seedText.setAttribute('data-id', seed.id);

				// Ajouter un écouteur pour remplir la seed lorsqu'on clique dessus
				seedText.addEventListener('click', () => {
					const seedSlider = document.getElementById('seed_slider');
					const seedTextBox = document.getElementById('seed_textbox');
					if (seedSlider && seedTextBox) {
						seedSlider.value = seed.value;
						seedTextBox.value = seed.value;
					}
				});

				// Ajouter un bouton pour supprimer la seed
				const deleteBtn = document.createElement('button');
				deleteBtn.type = 'button'; // Empêcher la soumission du formulaire
				deleteBtn.textContent = 'X';
				deleteBtn.style.cursor = 'pointer';
				deleteBtn.style.backgroundColor = 'var(--primary-color)'; // Bouton en mauve
				deleteBtn.style.color = 'white';
				deleteBtn.style.border = 'none';
				deleteBtn.style.borderRadius = '50%';
				deleteBtn.style.width = '20px';
				deleteBtn.style.height = '20px';
				deleteBtn.style.fontSize = '12px';

				deleteBtn.addEventListener('click', async (e) => {
					e.stopPropagation(); // Empêcher l'événement de clic de se propager
					try {
						const result = await window.electronAPI.deleteSeed(seed.id);
						if (result.success) {
							loadSavedSeeds(); // Recharger la liste
							// Recentrer le focus sur le champ de saisie de la seed
							const seedTextBox = document.getElementById('seed_textbox');
							if (seedTextBox) {
								seedTextBox.focus();
							}
						} else {
							console.log(translations[currentLanguage].seed_delete_error_alert || 'Erreur lors de la suppression de la seed.');
							// Optionnel : Afficher une notification ici
						}
					} catch (error) {
						console.error('Erreur lors de la suppression de la seed :', error);
						console.log(translations[currentLanguage].seed_delete_error_alert || 'Erreur lors de la suppression de la seed.');
						// Optionnel : Afficher une notification ici
					}
				});

				seedItem.appendChild(seedText);
				seedItem.appendChild(deleteBtn);
				seedsList.appendChild(seedItem);
			});
		} catch (error) {
			console.error('Erreur lors du chargement des seeds :', error);
			console.log(translations[currentLanguage].save_error_alert || 'Erreur lors du chargement des seeds.');
		}
		
	}


    // Fonction utilitaire pour obtenir l'extension à partir de l'URL
    function getExtensionFromUrl(url) {
        try {
            const parsedUrl = new URL(url);
            const pathname = parsedUrl.pathname;
            const extension = pathname.substring(pathname.lastIndexOf('.') + 1);
            return extension || 'png';
        } catch (e) {
            return 'png';
        }
    }
	
	// Fonction pour choisir les noms de fichiers
    function generateFilename(index) {
		const model = document.getElementById('model').value;
		const prompt = document.getElementById('prompt').value;
		const outputFormat = document.getElementById('output_format') ? document.getElementById('output_format').value : 'png';
		const date = new Date();
		const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${date
			.getDate()
			.toString()
			.padStart(2, '0')}-${date
			.getHours()
			.toString()
			.padStart(2, '0')}-${date
			.getMinutes()
			.toString()
			.padStart(2, '0')}`;
		const promptPart = prompt.slice(0, 60).replace(/\s+/g, '_');
		return `${model}-${dateString}-${promptPart}-${index + 1}.${outputFormat}`;
	}



    // Fonction du bouton "Télécharger"
	document.getElementById('downloadBtn').addEventListener('click', function () {
		const images = document.querySelectorAll('#output img');
		images.forEach((img, index) => {
			fetch(img.src)
				.then(response => response.blob())
				.then(blob => {
					const url = URL.createObjectURL(blob);
					const filename = generateFilename(index);
					const link = document.createElement('a');
					link.href = url;
					link.download = filename;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(url);
				})
				.catch(err => console.error('Erreur lors du téléchargement de l\'image :', err));
		});
	});

	// Fonction du bouton "Télécharger sous"
	document.getElementById('saveAsBtn').addEventListener('click', function () {
		const images = document.querySelectorAll('#output img');
		images.forEach((img, index) => {
			const filename = generateFilename(index);
			const link = document.createElement('a');
			link.href = img.src;
			link.download = filename;

			// Pour déclencher la boîte de dialogue "Enregistrer sous"
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		});
	});


    // Fonction du bouton "Stopper"
    document.getElementById('stopBtn').addEventListener('click', function () {
        if (controller) {
            controller.abort();
            controller = null;
            const loadingDiv = document.getElementById('loading');
            const outputDiv = document.getElementById('output');
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (outputDiv) outputDiv.innerHTML = `<p>${translations[currentLanguage].stop_btn}</p>`;
        }
    });
	
	//Fonction du boutton "Get Token"
	document.getElementById('getApiTokenBtn').addEventListener('click', function () {
		// URL de la page où l'utilisateur peut obtenir son token API
		const tokenUrl = 'https://replicate.com/account/api-tokens'; // Remplacez par l'URL appropriée

		// Utilisez l'API Electron pour ouvrir le lien dans le navigateur par défaut
		window.electronAPI.openExternalLink(tokenUrl);
	});

	function displayGeneratedImage(output) {
		if (Array.isArray(output)) {
			output.forEach((imageUrl, index) => {
				const img = document.createElement('img');
				img.src = imageUrl;
				img.alt = `Image générée ${index + 1}`;
				img.style.maxWidth = '100%';
				img.style.marginTop = '10px';
				document.getElementById('output').appendChild(img);
			});
		} else {
			const img = document.createElement('img');
			img.src = output;
			img.alt = 'Image générée';
			img.style.maxWidth = '100%';
			document.getElementById('output').appendChild(img);
		}
	}

	// Fonction pour télécharger une image
	function downloadImage(imageUrl, index) {
		fetch(imageUrl)
			.then(response => response.blob())
			.then(blob => {
				const url = URL.createObjectURL(blob);
				const filename = generateFilename(index);
				const link = document.createElement('a');
				link.href = url;
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(url);
			})
			.catch(err => console.error('Erreur lors du téléchargement de l\'image :', err));
	}