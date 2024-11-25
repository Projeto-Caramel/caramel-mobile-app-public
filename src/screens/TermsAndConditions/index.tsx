import React from "react";
import { ScrollView, Box, Text, Button, HStack, Icon } from "native-base";
import { StyleSheet } from "react-native";
import { Theme } from "../../styles/Theme";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function PrivacyPolicy() {
  const navigation = useNavigation();

  return (
    <Box flex={1} bg={Theme.colors.caramelLight[90]} padding={5}>
      <HStack justifyContent="space-between" alignItems="center" p={5}>
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <Icon
            as={Ionicons}
            name="chevron-back"
            size="md"
            color={Theme.colors.sealBrown.original}
          />
        </Button>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Text
          fontSize="2xl"
          bold
          color={Theme.colors.sealBrown.original}
          textAlign="center"
          mb={5}
        >
          Política de Privacidade Completa
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>1. Introdução</Text>{"\n"}
          O aplicativo <Text bold>Caramel</Text> (doravante referido como “nós”, “nosso” ou
          “Caramel”) valoriza a privacidade e a proteção dos dados pessoais de
          seus usuários (doravante referidos como “você” ou “usuário”). Estamos
          comprometidos com a transparência no tratamento de dados pessoais, em
          conformidade com a <Text bold>Lei Geral de Proteção de Dados Pessoais (LGPD -
          Lei nº 13.709/2018), a Constituição Federal, o Código de Defesa do
          Consumidor (Lei nº 8.078/1990) e demais legislações aplicáveis</Text>. Esta
          Política de Privacidade detalha como coletamos, utilizamos,
          armazenamos, compartilhamos e protegemos as informações fornecidas
          por você.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>2. Dados Coletados</Text>{"\n"}
          Em respeito aos princípios da <Text bold>finalidade, adequação e necessidade</Text>
          previstos no <Text bold>Artigo 6º da LGPD</Text>, coletamos apenas os dados essenciais
          para o funcionamento do aplicativo e prestação dos serviços:
          {"\n"}{"\n"}
          <Text bold>a. Informações Pessoais</Text>:
          {"\n"}<Text bold>i. Nome Completo</Text>: Identificação pessoal.
          {"\n"}<Text bold>ii. Data de Nascimento</Text>: Verificação de elegibilidade e
          adequação dos serviços às faixas etárias.
          {"\n"}<Text bold>iii. E-mail</Text>: Comunicação, recuperação de senha e notificações.
          {"\n"}<Text bold>iv. Senha</Text>: Acesso seguro à conta (armazenada de forma
          criptografada).
          {"\n"}<Text bold>v. Telefone</Text>: Facilitar contato durante o processo de adoção.
          {"\n"}
          <Text bold>b. Dados de Perfil</Text> :
          {"\n"}<Text bold>i. Tipo de Residência</Text>: Casa, apartamento, etc., para entender o
          ambiente de acolhimento.
          {"\n"}<Text bold>ii. Estilo de Vida</Text>: Ativo, sedentário, etc., para compatibilidade
          com o pet.
          {"\n"}<Text bold>iii. Experiência com Pets</Text>: Nível de experiência prévia.
          {"\n"}<Text bold>iv. Presença de Crianças no Lar</Text>: Avaliar necessidades
          específicas.
          {"\n"}<Text bold>v. Situação Financeira</Text>: Faixa de renda, para estimar a
          capacidade de sustento do pet.
          {"\n"}<Text bold>vi. Tempo Livre Disponível</Text>: Disponibilidade para cuidar do
          animal.
          {"\n"}
          <Text bold>c. Dados de Navegação</Text>:
          {"\n"}<Text bold>i. Endereço IP</Text>: Segurança e prevenção de fraudes.
          {"\n"}<Text bold>ii. Dados de Session Storage</Text>: Melhorar a experiência do usuário.
          {"\n"}<Text bold>iii. Logs de Acesso</Text>: Conforme Artigo 15 do Marco Civil da
          Internet (Lei nº 12.965/2014).
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>3. Finalidades do Tratamento de Dados</Text>{"\n"}
          Utilizamos os dados coletados para as seguintes finalidades, com as respectivas bases legais:
          {"\n"}{"\n"}
          <Text bold>a. Prestação dos Serviços (Artigo 7º, Inciso V da LGPD)</Text>:
          {"\n"}<Text bold>i. </Text> Personalizar recomendações de adoção usando inteligência artificial.
          {"\n"}<Text bold>ii. </Text> Facilitar o contato entre você e as ONGs parceiras.
          {"\n"}<Text bold>iii. </Text> Gerenciar e melhorar o aplicativo.
          {"\n"}
          <Text bold>b. Comunicações (Artigo 7º, Inciso I da LGPD)</Text>:
          {"\n"}<Text bold>i. </Text> Enviar notificações sobre sua conta, atualizações de serviços e feedback.
          {"\n"}
          <Text bold>c. Cumprimento de Obrigações Legais (Artigo 7º, Inciso II da LGPD)</Text>:
          {"\n"}<Text bold>i. </Text> Manter registros de acesso conforme exigido pelo Marco Civil da Internet.
          {"\n"}<Text bold>ii. </Text> Atender a solicitações de autoridades competentes.
          {"\n"}
          <Text bold>d. Legítimo Interesse (Artigo 7º, Inciso IX da LGPD)</Text>:
          {"\n"}<Text bold>i. </Text> Análises estatísticas e melhorias nos serviços.
          {"\n"}<Text bold>ii. </Text> Prevenção de fraudes e segurança.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>4. Compartilhamento de Dados</Text>{"\n"}
          Respeitamos sua privacidade e compartilhamos seus dados pessoais apenas nas seguintes situações:
          {"\n"}{"\n"}
          <Text bold>a. Com ONGs Parceiras</Text>:
          {"\n"}<Text bold>i. </Text> Dados necessários para viabilizar o processo de adoção e facilitar o contato.
          {"\n"}
          <Text bold>b. Com Fornecedores e Prestadores de Serviços</Text>:
          {"\n"}<Text bold>i. </Text> Empresas que nos auxiliam na operação do aplicativo, sob contratos que 
          garantem a confidencialidade e a segurança dos dados.
          {"\n"}
          <Text bold>c. Por Obrigações Legais:</Text>
          {"\n"}<Text bold>i. </Text> Compartilhamento com autoridades governamentais ou judiciais, conforme 
          exigido por lei.
          {"\n"}
          <Text bold>d. Transferência Internacional de Dados</Text>:
          {"\n"}<Text bold>i. </Text> Caso haja necessidade de transferir dados para outros países, garantimos 
          a conformidade com o <Text bold>Capítulo V da LGPD</Text>, adotando medidas para assegurar a proteção dos dados.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>5. Armazenamento e Proteção de Dados</Text>{"\n"}
          Implementamos medidas de segurança técnicas e administrativas adequadas, conforme o <Text bold>Artigo 46 da LGPD</Text>
          , incluindo:
          {"\n"}{"\n"}
          <Text bold>a. Criptografia</Text>:
          {"\n"}<Text bold>i. </Text> Dados sensíveis são criptografados em trânsito e em repouso.
          {"\n"}
          <Text bold>b. Controle de Acesso</Text>:
          {"\n"}<Text bold>i. </Text> Acesso restrito aos dados pessoais apenas a colaboradores autorizados.
          {"\n"}
          <Text bold>c. Monitoramento e Auditoria</Text>:
          {"\n"}<Text bold>i. </Text> Sistemas de detecção de intrusões e auditorias regulares de segurança.
          {"\n"}
          <Text bold>d. Políticas Internas</Text>:
          {"\n"}<Text bold>i. </Text> Treinamento de funcionários e políticas de confidencialidade.
          {"\n"}
          Os dados serão armazenados pelo período necessário para cumprir as
          finalidades descritas, observando os prazos legais aplicáveis, como o
          <Text bold> Artigo 15 do Marco Civil da Internet</Text>, que exige a manutenção de registros
          de acesso por, no mínimo, seis meses.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>6. Direitos do Usuário</Text>{"\n"}
          Os direitos do Usuário estão assegurados, conforme estabelecido na Lei
          Geral de Proteção de Dados Pessoais (LGPD) e demais legislações aplicáveis.
          {"\n"}{"\n"}
          <Text bold>a. Confirmação da Existência de Tratamento (Artigo 18, Inciso I)</Text>:
          {"\n"}<Text bold>i. </Text> Verificar se realizamos o tratamento de seus dados pessoais.
          {"\n"}
          <Text bold>b. Acesso aos Dados (Artigo 18, Inciso II)</Text>:
          {"\n"}<Text bold>i. </Text> Solicitar cópia dos dados pessoais que possuímos sobre você.
          {"\n"}
          <Text bold>c. Correção de Dados (Artigo 18, Inciso III)</Text>:
          {"\n"}<Text bold>i. </Text> Atualizar ou corrigir informações desatualizadas ou incorretas.
          {"\n"}
          <Text bold>d. Anonimização, Bloqueio ou Eliminação (Artigo 18, Inciso IV)</Text>:
          {"\n"}<Text bold>i. </Text> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.
          {"\n"}
          <Text bold>e. Portabilidade (Artigo 18, Inciso V)</Text>:
          {"\n"}<Text bold>i. </Text> Solicitar que seus dados sejam transferidos para outro fornecedor de serviço.
          {"\n"}
          <Text bold>f. Eliminação dos Dados Tratados com Consentimento (Artigo 18, Inciso VI)</Text>:
          {"\n"}<Text bold>i. </Text> Pedir a exclusão de dados tratados com base no seu consentimento.
          {"\n"}
          <Text bold>g. Informação sobre Compartilhamento (Artigo 18, Inciso VII)</Text>:
          {"\n"}<Text bold>i. </Text> Saber com quais entidades públicas ou privadas compartilhamos seus dados.
          {"\n"}
          <Text bold>h. Informação sobre a Possibilidade de Não Consentir (Artigo 18, Inciso VIII)</Text>:
          {"\n"}<Text bold>i. </Text> Ser informado sobre a possibilidade de não fornecer consentimento e sobre as consequências.
          {"\n"}
          <Text bold>i. Revogação do Consentimento (Artigo 18, Inciso IX)</Text>:
          {"\n"}<Text bold>i. </Text> Retirar o consentimento dado anteriormente.
          {"\n"}
          Para exercer seus direitos, entre em contato pelo e-mail
          contato@projetocaramel.com.br. Atenderemos sua solicitação no 
          prazo estabelecido pela legislação aplicável.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>7. Session Storage e Tecnologias Semelhantes</Text>{"\n"}
          Utilizamos tecnologias como o Session Storage (Armazenamento de Sessão) para melhorar sua experiência
          em nosso aplicativo. Estas tecnologias permitem que armazenemos informações
          temporárias no seu dispositivo para viabilizar a funcionalidade do
          aplicativo, garantindo maior desempenho e conveniência para você. {"\n"}{"\n"}
          <Text bold>a. O que é Session Storage</Text>:
          {"\n"}<Text bold>i. </Text> O Session Storage é uma tecnologia que permite armazenar dados de
          forma temporária no navegador ou dispositivo do usuário, sendo excluído
          automaticamente quando o aplicativo ou o navegador é fechado. {"\n"}
          <Text bold>b. Finalidade do Uso</Text>:
          {"\n"}<Text bold>i. </Text> Manter você conectado durante a sessão.
          {"\n"}<Text bold>ii. </Text> Armazenar preferências temporárias do usuário. 
          {"\n"}<Text bold>iii. </Text> Melhorar a velocidade e desempenho do aplicativo. 
          {"\n"}
          <Text bold>c. Gerenciamento do Session Storage</Text>:
          {"\n"}<Text bold>i. </Text> Os dados armazenados no Session Storage são temporários e serão excluídos 
          quando você fechar o aplicativo ou o navegador. 
          {"\n"}<Text bold>ii. </Text> Você pode gerenciar ou desativar o Session Storage por meio das configurações 
          do seu dispositivo ou navegador, porém isso pode afetar a funcionalidade do aplicativo.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>8. Dados de Crianças e Adolescentes</Text>{"\n"}
          O Caramel não é destinado a menores de 18 anos sem o consentimento dos pais ou 
          responsáveis, conforme o <Text bold>Estatuto da Criança e do Adolescente (Lei nº 8.069/1990)</Text>. 
          Se identificarmos dados de menores sem o devido consentimento, tomaremos as medidas 
          para excluir tais informações.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>9. Alterações na Política de Privacidade</Text>{"\n"}
          Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. 
          Em caso de alterações significativas, notificaremos você pelos meios de contato
           fornecidos ou por aviso no aplicativo, em conformidade com o <Text bold>Artigo 48 da LGPD</Text>. A 
           data da última atualização será sempre informada no final deste documento.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>10. Disposições Gerais</Text>{"\n"}
          Utilizamos tecnologias como o Session Storage (Armazenamento de Sessão) para melhorar sua experiência
          em nosso aplicativo. Estas tecnologias permitem que armazenemos informações
          temporárias no seu dispositivo para viabilizar a funcionalidade do
          aplicativo, garantindo maior desempenho e conveniência para você. {"\n"}{"\n"}
          <Text bold>a.</Text> Legislação Aplicável:
          {"\n"}<Text bold>i. </Text>Esta Política de Privacidade é regida pelas leis brasileiras. {"\n"}
          <Text bold>b.</Text> Foro:
          {"\n"}<Text bold>i. </Text> Eventuais disputas serão resolvidas no foro do domicílio do consumidor, conforme
           o <Text bold>Artigo 101, Inciso I do Código de Defesa do Consumidor.</Text>
          {"\n"}
          <Text bold>c. </Text>Aceitação dos Termos:
          {"\n"}<Text bold>i. </Text> Ao utilizar o aplicativo Caramel, você concorda com os termos desta Política 
          de Privacidade e dos <Text bold>Termos de Uso.</Text>
          {"\n"}
        </Text>
        
        <Text style={styles.paragraph}>
          <Text style={styles.title}>11. Segurança da Informação</Text>{"\n"}
          Adotamos as melhores práticas de segurança da informação, em conformidade com normas 
          reconhecidas, como a <Text bold>ISO/IEC 27001</Text>, para garantir a integridade, confidencialidade e
           disponibilidade dos dados.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>12. Responsável pelo Tratamento dos Dados</Text>{"\n"}
          Para efeitos da LGPD, o Caramel é o controlador dos dados pessoais coletados. Temos um Encarregado 
          de Proteção de Dados (DPO) que pode ser contatado pelo e-mail contato@projetocaramel.com.br.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>13. Procedimentos em Caso de Incidentes de Segurança</Text>{"\n"}
          Em conformidade com o <Text bold>Artigo 48 da LGPD</Text>, em caso de incidente de segurança que 
          possa acarretar risco ou dano relevante, notificaremos a 
          <Text bold>Autoridade Nacional de Proteção de Dados (ANPD)</Text> e você, informando as medidas 
          tomadas para remediar o ocorrido.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>14. Direitos do Consumidor</Text>{"\n"}
          Esta Política de Privacidade respeita e incorpora os princípios e normas do 
          <Text bold> Código de Defesa do Consumidor</Text>, garantindo transparência, 
          segurança, acesso à informação e respeito aos direitos dos usuários.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>15. Terceirização e Subcontratação</Text>{"\n"}
          Poderemos utilizar serviços de terceiros para auxiliar na operação do aplicativo. 
          Garantimos que tais terceiros estão em conformidade com a LGPD e adotam medidas 
          adequadas de proteção de dados.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>16. Atualização dos Seus Dados</Text>{"\n"}
          É importante que os dados pessoais fornecidos sejam precisos e atualizados. 
          Você é responsável por manter suas informações atualizadas no aplicativo.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>17. Consentimento de Crianças e Adolescentes</Text>{"\n"}
          Caso o tratamento de dados pessoais de menores de idade seja necessário, 
          obteremos o consentimento específico e em destaque de pelo menos um dos 
          pais ou responsável legal, conforme <Text bold>Artigo 14 da LGPD</Text>.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>18. Conformidade com Outras Legislações</Text>{"\n"}
          Além da LGPD, estamos em conformidade com outras legislações aplicáveis, 
          como o Marco Civil da Internet, o Código Civil, o Código Penal, entre outras.
          {"\n"}
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.title}>19. Fale Conosco</Text>{"\n"}
          Se você tiver alguma dúvida, sugestão ou reclamação sobre esta Política 
          de Privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco:
          {"\n"}{"\n"}
          <Text bold>a.</Text> E-mail: contato@projetocaramel.com.br
        </Text>

        <Text>Última atualização: 21 de novembro de 2024.</Text>

        <Button
          mt={5}
          colorScheme="brown"
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    color: Theme.colors.brown.minus50,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: "justify",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.brown.minus10,
    marginTop: 15,
    marginBottom: 5,
  },
});
