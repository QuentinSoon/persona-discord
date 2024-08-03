import CommandBuilder from '../builder/CommandBuilder';
import CommandStructure from '../structure/CommandStructure';

export default class SetupCommand extends CommandStructure {
	constructor() {
		super(
			new CommandBuilder()
				.setName('setup')
				.setDescription('Configurer et éditeur de configuration')
				.setDescriptionLocalizations({
					id: 'Editor konfigurasi dan konfigurasi',
					'en-US': 'Setup and configuration editor',
					'en-GB': 'Setup and configuration editor',
					bg: 'Конфигурация и редактор на конфигурацията',
					'zh-CN': '配置和配置编辑器',
					'zh-TW': '設定與設定編輯器',
					hr: 'Konfiguracija i uređivač konfiguracije',
					cs: 'Editor konfigurace a konfigurace',
					da: 'Konfigurations- og konfigurationseditor',
					nl: 'Configureer- en configuratie-editor',
					fi: 'Configure and Configuration Editor',
					fr: 'Configurer et éditeur de configuration',
					de: 'Konfigurieren und Konfigurationseditor',
					el: 'Διαμόρφωση και Επεξεργαστής Διαμόρφωσης',
					hi: 'कॉन्फ़िगर और कॉन्फ़िगरेशन संपादक',
					hu: 'Konfiguráció és konfigurációszerkesztő',
					it: 'Configura e editor di configurazione',
					ja: '構成および構成エディター',
					ko: '구성 및 구성 편집기',
					lt: 'Konfigūravimo ir konfigūravimo rengyklė',
					no: 'Konfigurerings- og konfigurasjonsredigerer',
					pl: 'Konfiguracja i Edytor konfiguracji',
					'pt-BR': 'Editor de configuração e configuração',
					ro: 'Configurare și Editor de configurare',
					ru: 'Редактор настроек и конфигурации',
					'es-ES': 'Configurar y editor de configuración',
					'es-419': 'Configurar y editor de configuración',
					'sv-SE': 'Konfigurera och konfigurera Editor',
					th: 'กำหนดค่าและตัวแก้ไขการกำหนดค่า',
					tr: 'Yapılandırma ve Yapılandırma Düzenleyicisi',
					uk: 'Конфігурація та редактор конфігурацій',
					vi: 'Cấu hình và biên tập cấu hình',
				})
				.addModule('panel:start')
		);
	}
}
