# Plano de Testes de Software

Este é o Plano de Testes do Rentabook. Aqui serão relatados os cenários de testes utilizados na realização dos testes da aplicação. Serão escolhidos cenários de testes que demonstrem os requisitos sendo satisfeitos. Aqui serão enumerados quais cenários de testes foram selecionados para teste. Neste tópico o grupo irá detalhar as funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

## Plano de Testes da página de Cadastro de Usuário
#### Responsável: Alisson A. Carvalho

Esta página é responsável pelo processo de cadastro de novos usuários na aplicação. Os usuários podem inserir seu nome, e-mail, senha e confirmação de senha para criar uma nova conta.

<table>
        <thead>
            <tr>
                <th>Casos de Teste</th>
                <th>Requisitos Associados</th>
                <th>Objetivo do Teste</th>
                <th>Passos</th>
                <th>Critérios de Êxito</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1. Teste da função handleInputChange</td>
                <td>RF-001</td>
                <td>Garantir que a função handleInputChange atualize corretamente os campos e limpe as mensagens de erro.</td>
                <td>
                    <ol>
                        <li>Chame handleInputChange para cada campo com valores válidos.</li>
                        <li>Verifique se o campo é atualizado corretamente.</li>
                        <li>Chame handleInputChange para cada campo com valores inválidos.</li>
                        <li>Verifique se as mensagens de erro são limpas.</li>
                    </ol>
                </td>
                <td>A função handleInputChange atualiza corretamente os campos e limpa as mensagens de erro.</td>
            </tr>
            <tr>
                <td>2. Teste da função updateOrientation</td>
                <td>RNF-001</td>
                <td>Garantir que a função updateOrientation determine a orientação corretamente.</td>
                <td>
                    <ol>
                        <li>Chame updateOrientation com uma orientação em modo paisagem.</li>
                        <li>Verifique se a orientação é definida como "LANDSCAPE".</li>
                        <li>Chame updateOrientation com uma orientação em modo retrato.</li>
                        <li>Verifique se a orientação é definida como "PORTRAIT".</li>
                    </ol>
                </td>
                <td>A função updateOrientation determina a orientação corretamente.</td>
            </tr>
            <tr>
                <td>3. Teste de validação do campo "Nome"</td>
                <td>RF-001</td>
                <td>Verificar se a validação do campo "Nome" funciona conforme o esquema yup.</td>
                <td>
                    <ol>
                        <li>Insira um nome válido.</li>
                        <li>Insira um nome em branco.</li>
                        <li>Insira um nome muito longo.</li>
                    </ol>
                </td>
                <td>A validação do campo "Nome" funciona conforme o esquema yup.</td>
            </tr>
            <tr>
                <td>4. Teste de validação do campo "Email"</td>
                <td>RF-001</td>
                <td>Verificar se a validação do campo "Email" funciona conforme o esquema yup.</td>
                <td>
                    <ol>
                        <li>Insira um e-mail válido.</li>
                        <li>Insira um e-mail inválido.</li>
                        <li>Insira um e-mail em branco.</li>
                    </ol>
                </td>
                <td>A validação do campo "Email" funciona conforme o esquema yup.</td>
            </tr>
            <tr>
                <td>5. Teste de validação do campo "Senha"</td>
                <td>RF-001</td>
                <td>Verificar se a validação do campo "Senha" funciona conforme o esquema yup.</td>
                <td>
                    <ol>
                        <li>Insira uma senha válida.</li>
                        <li>Insira uma senha com menos de 8 caracteres.</li>
                        <li>Insira uma senha sem maiúsculas.</li>
                        <li>Insira uma senha sem minúsculas.</li>
                        <li>Insira uma senha sem números.</li>
                        <li>Insira uma senha sem caracteres especiais.</li>
                    </ol>
                </td>
                <td>A validação do campo "Senha" funciona conforme o esquema yup.</td>
            </tr>
            <tr>
                <td>6. Teste de validação do campo "Confirmação de Senha"</td>
                <td>RF-001</td>
                <td>Verificar se a validação do campo "Confirmação de Senha" funciona conforme o esquema yup.</td>
                <td>
                    <ol>
                        <li>Insira uma confirmação de senha que corresponda à senha.</li>
                        <li>Insira uma confirmação de senha que não corresponda à senha.</li>
                    </ol>
                </td>
                <td>A validação do campo "Confirmação de Senha" funciona conforme o esquema yup.</td>
            </tr>
            <tr>
                <td>7. Teste do fluxo de cadastro de usuário bem-sucedido</td>
                <td>RF-001</td>
                <td>Verificar se o fluxo de cadastro de usuário é concluído com sucesso.</td>
                <td>
                    <ol>
                        <li>Preencha todos os campos corretamente.</li>
                        <li>Clique no botão "Continuar".</li>
                    </ol>
                </td>
                <td>O usuário é registrado com sucesso e os campos são limpos.</td>
            </tr>
            <tr>
                <td>8. Teste do fluxo de cadastro de usuário com falha de validação</td>
                <td>RF-001</td>
                <td>Verificar se o tratamento de falha de validação é adequado.</td>
                <td>
                    <ol>
                        <li>Preencha os campos com dados inválidos.</li>
                        <li>Clique no botão "Continuar".</li>
                    </ol>
                </td>
                <td>As mensagens de erro são exibidas corretamente.</td>
            </tr>
        </tbody>
    </table>

## Plano de Testes da página de Login de Usuário
#### Responsável: Alisson A. Carvalho

Esta página é responsável pelo processo de login de usuários existentes na aplicação. Os usuários podem inserir seu e-mail e senha para acessar suas contas.

<table>
        <thead>
            <tr>
                <th>Casos de Teste</th>
                <th>Requisitos Associados</th>
                <th>Objetivo do Teste</th>
                <th>Passos</th>
                <th>Critérios de Êxito</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1. Teste da função handleInputChange</td>
                <td>RF-003</td>
                <td>Garantir que a função handleInputChange atualize corretamente os campos e limpe as mensagens de erro.</td>
                <td>
                    <ol>
                        <li>Chame handleInputChange para o campo "Email" com um valor válido.</li>
                        <li>Verifique se o campo "Email" é atualizado corretamente.</li>
                        <li>Chame handleInputChange para o campo "Senha" com um valor válido.</li>
                        <li>Verifique se o campo "Senha" é atualizado corretamente.</li>
                        <li>Chame handleInputChange para o campo "Email" com um valor inválido.</li>
                        <li>Verifique se a mensagem de erro do campo "Email" é limpa.</li>
                        <li>Chame handleInputChange para o campo "Senha" com um valor inválido.</li>
                        <li>Verifique se a mensagem de erro do campo "Senha" é limpa.</li>
                    </ol>
                </td>
                <td>A função handleInputChange atualiza corretamente os campos e limpa as mensagens de erro.</td>
            </tr>
            <tr>
                <td>2. Teste da função updateOrientation</td>
                <td>RNF-001</td>
                <td>Garantir que a função updateOrientation determine a orientação corretamente.</td>
                <td>
                    <ol>
                        <li>Chame updateOrientation com uma orientação em modo paisagem.</li>
                        <li>Verifique se a orientação é definida como "LANDSCAPE".</li>
                        <li>Chame updateOrientation com uma orientação em modo retrato.</li>
                        <li>Verifique se a orientação é definida como "PORTRAIT".</li>
                    </ol>
                </td>
                <td>A função updateOrientation determina a orientação corretamente.</td>
            </tr>
            <tr>
                <td>3. Teste de validação do campo "Email"</td>
                <td>RF-003</td>
                <td>Verificar se a validação do campo "Email" funciona conforme o esquema yup.</td>
                <td>
                    <ol>
                        <li>Insira um e-mail válido.</li>
                        <li>Insira um e-mail inválido.</li>
                        <li>Insira um e-mail em branco.</li>
                    </ol>
                </td>
                <td>A validação do campo "Email" funciona conforme o esquema yup.</td>
            </tr>
            <tr>
                <td>4. Teste de validação do campo "Senha"</td>
                <td>RF-003</td>
                <td>Verificar se a validação do campo "Senha" funciona conforme o esquema yup.</td>
                <td>
                    <ol>
                        <li>Insira uma senha válida.</li>
                        <li>Insira uma senha em branco.</li>
                    </ol>
                </td>
                <td>A validação do campo "Senha" funciona conforme o esquema yup.</td>
            </tr>
            <tr>
                <td>5. Teste do fluxo de login bem-sucedido</td>
                <td>RF-003</td>
                <td>Verificar se o fluxo de login é concluído com sucesso.</td>
                <td>
                    <ol>
                        <li>Preencha o campo "Email" e o campo "Senha" com valores válidos.</li>
                        <li>Clique no botão "Entrar".</li>
                        <li>Verifique se a página de anúncios é navegada com sucesso.</li>
                    </ol>
                </td>
                <td>O usuário é autenticado com sucesso e redirecionado para a página de anúncios.</td>
            </tr>
            <tr>
                <td>6. Teste do fluxo de login com credenciais inválidas</td>
                <td>RF-003</td>
                <td>Verificar se o tratamento de login com credenciais inválidas é adequado.</td>
                <td>
                    <ol>
                        <li>Preencha o campo "Email" e o campo "Senha" com valores inválidos.</li>
                        <li>Clique no botão "Entrar".</li>
                        <li>Verifique se as mensagens de erro são exibidas corretamente.</li>
                    </ol>
                </td>
                <td>As mensagens de erro são exibidas corretamente.</td>
            </tr>
        </tbody>
    </table>

## Plano de Testes da listagem de anúncios.
#### Responsável: João Lucas

<table>
        <thead>
            <tr>
                <th>Caso de Teste</th>
                <th>Requisitos Associados</th>
                <th>Objetivo do Teste</th>
                <th>Passos</th>
                <th>Critérios de Êxito</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>CT-03 Listar os anúncios</td>
                <td>RF-007 Exibir ao usuário uma lista de livros disponíveis para troca, venda ou aluguel</td>
                <td>Verificar se os anúncios de troca, venda ou aluguel estão sendo exibidos corretamente</td>
                <td>
                    <ol>
                        <li>Acessar o Navegador</li>
                        <li>Informar o endereço do Site</li>
                        <li>Visualizar a página principal</li>
                    </ol>
                </td>
                <td>
                Os anúncios devem ser listados, apresentando o título do livro, imagem de destaque, disponibilidade para venda, compra ou aluguel e valores.
                </td>
            </tr>
        </tbody>
    </table>

## Plano de Testes de criação de anuncio.
#### Responsável: Vitor Alexandre

Esta página é responsável pelo processo de login de usuários existentes na aplicação. Os usuários podem inserir seu e-mail e senha para acessar suas contas.

<table>
	<thead>
		<tr>
			<th>Casos de Teste</th>
			<th>Requisitos Associados</th>
			<th>Objetivo do Teste</th>
			<th>Passos</th>
			<th>Critérios de Êxito</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>CT-04</td>
			<td>RF-014 - Permitir ao usuário cadastrar e disponibilizar seus livros para negociação (aluguel, troca e venda)</td>
			<td>Garantir que o usuário consiga cadastrar um livro para negociação</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>A partir da pagina meus anuncios, o usuário deve clicar no botão cadastrar livro.</li>
					<li>Após prencher corretamente as informações necessarias:</li>
					<li>Escolher o tipo de negociação</li>
					<li>Escolher o livro a ser negociado</li>
					<li>Escolher o endereço de negociação</li>
					<li>Prencher as informações com os valores caso necessario</li>
					<li>Quando todas as informações necessarias forem prenchidas, o botão criar ficara ativo.</li>
					<li>Clicar no botão criar.</li>
				</ol>
			</td>
			<td>O sistema deve emitir uma mensagem confirmando o procedimento.</td>
		</tr>
	</tbody>
</table>


## Plano de Testes de cadastro de fotos dos livros.
#### Responsável: Vitor Alexandre

Esta página é responsável pelo processo de login de usuários existentes na aplicação. Os usuários podem inserir seu e-mail e senha para acessar suas contas.

<table>
	<thead>
		<tr>
			<th>Casos de Teste</th>
			<th>Requisitos Associados</th>
			<th>Objetivo do Teste</th>
			<th>Passos</th>
			<th>Critérios de Êxito</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>CT-05</td>
			<td>RF-016 - Permitir ao usuário anexar fotos do livro ao seu anúncio</td>
			<td>Garantir que o usuário consiga cadastrar uma foto de um livro</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Deve haver pelo menos um livro cadastrado.</li>
					<li>O usuário deve clicar no botão "Editar" no card do livro</li>
					<li>Na pagina de edição o usuário deve clicar em "select file"</li>
					<li>Apos escolher a foto a ser cadastrada o usuário deve clicar no botão "Salvar"</li>
				</ol>
			</td>
			<td>O sistema deve emitir uma mensagem confirmando o procedimento.</td>
		</tr>
	</tbody>
</table>

## Plano de Testes da listagem dos livros em negociação.
#### Responsável: Vitor Alexandre

Esta página é responsável pelo processo de login de usuários existentes na aplicação. Os usuários podem inserir seu e-mail e senha para acessar suas contas.

<table>
	<thead>
		<tr>
			<th>Casos de Teste</th>
			<th>Requisitos Associados</th>
			<th>Objetivo do Teste</th>
			<th>Passos</th>
			<th>Critérios de Êxito</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>CT-06</td>
			<td>RF-017 - Listar ao usuário seus livros em negociação</td>
			<td>Garantir que o usuário consiga ver seus livros em negociação</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Deve haver pelo menos um livro cadastrado.</li>
					<li>O usuário deve acessar a pagina "Meus anuncios".</li>
				</ol>
			</td>
			<td>O sistema deve exibir os livros cadastrados para negociação.</td>
		</tr>
	</tbody>
</table>
	
## Plano de Testes do filtro de livros em negociação.
#### Responsável: Vitor Alexandre

Esta página é responsável pelo processo de login de usuários existentes na aplicação. Os usuários podem inserir seu e-mail e senha para acessar suas contas.

<table>
	<thead>
		<tr>
			<th>Casos de Teste</th>
			<th>Requisitos Associados</th>
			<th>Objetivo do Teste</th>
			<th>Passos</th>
			<th>Critérios de Êxito</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>CT-07</td>
			<td>RF-018	Permitir ao usuário filtrar a lista com seus livros em negociação</td>
			<td>Garantir que o usuário consiga filtrar seus livros em negociação</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Deve haver pelo menos dois livros cadastrados.</li>
					<li>O usuário deve acessar a pagina "Meus anuncios".</li>
					<li>O usuário deve alterar a ordenção dos livros para qualquer opção.</li>
					<li>O usuário deve digitar parte do nome de algum livro.</li>
				</ol>
			</td>
			<td>O sistema deve exibir os livros cadastrados de acordo com o filtro selecionado.</td>
		</tr>
	</tbody>
</table>

## Plano de Testes do Chat.
#### Responsável: Carlos Eduardo

Está página é responsavel pelo envio de mensagens, listagem dos chats e Confirmação/cancelamento das negociações.

<table>
	<thead>
		<tr>
			<th>Casos de Teste</th>
			<th>Requisitos Associados</th>
			<th>Objetivo do Teste</th>
			<th>Passos</th>
			<th>Critérios de Êxito</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>CT-08</td>
			<td>RF-08	Permitir aos usuários trocarem mensagens via chat.</td>
			<td>Verificar se há êxito no envio de mensagens entre usuários.</td>
			<td>
				<ol>
					<li>Acessar o navegador.</li>
					<li>Informar o endereço do site.</li>
					<li>Realizar o login.</li>
					<li>No menu de navegação, acessar "Mensagens".</li>
					<li>Escolher um dos chats, na lista de conversas.</li>
					<li>Clicar na caixa de texto para enviar mensagens, digitar uma mensagem e envia-la.</li>
				</ol>
			</td>
			<td>A mensagem deve ser enviada com êxito e recebida pelo seu destinatário.</td>
		</tr>
  
  </tr>
	</thead>
	<tbody>
		<tr>
			<td>CT-09</td>
			<td>RF-010	Permitir ao usuário cancelar ou aceitar uma venda, aluguel ou troca de um livro.</td>
			<td>Verificar se o cancelamento ou confirmação da venda, aluguel ou troca de livro ocorre corretamente.</td>
			<td>
				<ol>
					<li>Acessar o navegador.</li>
					<li>Informar o endereço do site.</li>
					<li>Realizar o login.</li>
					<li>No menu de navegação, acessar "Mensagens".</li>
					<li>Escolher um dos chats, na lista de conversas.</li>
					<li>Caso o usuário seja o proprietário da negociação deve haver um banner.</li>
					<li>No banner, clique no botão cancelar ou aceitar.</li>
				</ol>
			</td>
			<td>A venda deve ser cancelada ou confirmada e a conversa automaticamente é apagada.</td>
		</tr>
	</tbody>
 <tbody>
		<tr>
			<td>CT-10</td>
			<td>RF-09	Permitir ao usuário visualizar uma lista de todas as suas conversas com outros usuários.</td>
			<td>Verificar se a listagem das conversas ocorrem corretamente.</td>
			<td>
				<ol>
					<li>Acessar o navegador.</li>
					<li>Informar o endereço do site.</li>
					<li>Realizar o login.</li>
					<li>No menu de navegação, acessar "Mensagens".</li>
					<li>Clicar em "Mostrar Conversas.</li>
				</ol>
			</td>
			<td>A listagem das converasas deve ocorrer sem erros.</td>
		</tr>
	</tbody>
</table>

## Plano de Testes da listagem de anúncios.
#### Responsável: João Lucas

<table>
        <thead>
            <tr>
                <th>Caso de Teste</th>
                <th>Requisitos Associados</th>
                <th>Objetivo do Teste</th>
                <th>Passos</th>
                <th>Critérios de Êxito</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>CT-11 - Permitir ao usuário pesquisar por anúncios de um livro em específico</td>
                <td>RF-012 - Permitir ao usuário pesquisar por um livro específico</td>
                <td>Verificar se os anúncios de troca, venda ou aluguel estão sendo exibidos corretamente com base no livro pesquisado e escolhido pelo usuário</td>
                <td>
                    <ol>
                        <li>Acessar o aplicativo (dispositivos móveis) ou o site através de um navegador</li>
                        <li>Visualizar a página principal</li>
                        <li>Clicar na barra de pesquisa</li>
                        <li>Digitar o livro desejado</li>
                        <li>Clicar no livro desejado</li>
                    </ol>
                </td>
                <td>
                <ol>
                        <li>Deve ser exibido apenas os anúncios do livro desejado</li>
                        <li>Caso não houver anúncios daquele livro, deve haver um feedback para o usuário</li>
                    </ol>
                </td>
            </tr>
            <tr>
                <td>CT-12 - Permitir ao usuário filtrar os anúncios em dispositivos desktop</td>
                <td>RF-013 - Permitir ao usuário filtrar a lista de livros disponiveis para negociação</td>
                <td>Verificar se os anúncios estão sendo exibidos corretamente com base nos filtros escolhidos pelo usuário nos dispositivos desktop</td>
                <td>
                    <ol>
                        <li>Acessar o Navegador</li>
                        <li>Informar o endereço do Site</li>
                        <li>Visualizar a página principal</li>
                        <li>Escolher os filtros desejados na barra lateral esquerda</li>
                        <li>Escolher a ordenação desejada no menu drop-down que se encontra ao lado direito da barra de pesquisa</li>
                    </ol>
                </td>
                <td>
                    <li>Deve ser exibido os anúncios de acordo com a ordenação e filtros escolhidos pelo usuário
                </td>
            </tr>
            <tr>
                <td>CT-13 - Permitir ao usuário filtrar os anúncios em dispositivos móveis</td>
                <td>RF-013 - Permitir ao usuário filtrar a lista de livros disponiveis para negociação</td>
                <td>Verificar se os anúncios estão sendo exibidos corretamente com base nos filtros escolhidos pelo usuário nos dispositivos móveis</td>
                <td>
                    <ol>
                        <li>Acessar o aplicativo ou o site através de um navegador</li>
                        <li>Visualizar a página principal</li>
                        <li>Clicar em "Filtros" que se encontra abaixo da barra de pesquisa</li>
                        <li>Escolher os filtros e ordenação desejada</li>
                    </ol>
                </td>
                <td>
                    <li>Deve ser exibido os anúncios de acordo com a ordenação e filtros escolhidos pelo usuário
                </td>
            </tr>
            </tbody>
</table>   

## Plano de Testes dos detalhes dos anúncios.
#### Responsável: João Lucas

<table>
        <thead>
            <tr>
                <th>Caso de Teste</th>
                <th>Requisitos Associados</th>
                <th>Objetivo do Teste</th>
                <th>Passos</th>
                <th>Critérios de Êxito</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>CT-14 - Permitir ao usuário ver os detalhes de um anúncio em específico</td>
                <td>RF-019 - Permitir ver detalhes sobre uma negociação em específico</td>
                <td>Verificar se os detalhes do anúncio estão sendo exibidos corretamente</td>
                <td>
                    <ol>
                        <li>Acessar o aplicativo (dispositivos móveis) ou o site através de um navegador</li>
                        <li>Visualizar a página principal</li>
                        <li>Clicar em um anúncio</li>
                    </ol>
                </td>
                <td> Deve ser exibido o título do anúncio, fotos, descrição do anúncio, descrição do livro, localização do anúncio, avaliações e valores.</td>
            </tr>
            </tbody>
</table>

## Plano de Testes das avaliações dos anúncios.
#### Responsável: João Lucas

<table>
        <thead>
            <tr>
                <th>Caso de Teste</th>
                <th>Requisitos Associados</th>
                <th>Objetivo do Teste</th>
                <th>Passos</th>
                <th>Critérios de Êxito</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>CT-15 - Permitir ao usuário avaliar as negociações realizadas</td>
                <td>RF-020	Permitir aos usuários avaliar as negociações de livro realizadas</td>
                <td>Verificar se ao terminar uma negociação, o usuário tem a possibilidade de realizar uma avaliação e verificar se a avaliação está sendo exibida corretamente no anúncio da negociação</td>
                <td>
                    <ol>
                        <li>Acessar o aplicativo (dispositivos móveis) ou o site através de um navegador</li>
                        <li>Visualizar a página principal</li>
                        <li>Clicar em um anúncio</li>
                        <li>Clicar em "Negociar"</li>
                        <li>Realizar um pedido de negociação</li>
                        <li>Aguardar o proprietário aceitar o pedido de negociação</li>
                        <li>Realizar uma negociação</li>
                        <li>Terminar uma negociação</li>
                        <li>Navegar até o Chat através da barra de navegação</li>
                        <li>Clicar nas mensagens da negociação finalizada</li>
                        <li>Clicar em "Avalie essa negociação"</li>
                        <li>Avalie a negociação</li>
                    </ol>
                </td>
                <td> A avaliação deve ser realizada corretamente e exibida no anúncio da negociação realizada</td>
            </tr>
        </tbody>
    </table>

## Plano de Testes cadasdro da Página de Pérfil.
#### Responsável: Henrique Alexandre

Esta página é responsável pelo cadastro de endereços do usuário e alteração de nome e foto de perfil do usuário
<table>
	<thead>
		<tr>
			<th>Casos de Teste</th>
			<th>Requisitos Associados</th>
			<th>Objetivo do Teste</th>
			<th>Passos</th>
			<th>Critérios de Êxito</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>CT-16 - Cadastro de endereço </td>
			<td>RF-002 - Permitir ao usuário que cadastre, altere ou delete seus endereços.</td>
			<td>Garantir que o usuário consiga cadastrar novos endereços </td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Na página de perfil do usuário preencher os campos relacionados ao endereço.</li>
					<li>Após prencher corretamente os campos necessários clicar no botão de Salvar</li>
					<li>Após Clicar no botão de salvar entrar novamente na página de perfil do usuário</li>
					<li>Clicar no nome do endereço cadastrado e verificar se estão corretos.</li>
				</ol>
			</td>
			<td>O sistema deve criar um endereço e exibi-lo na página de perfil do usuário.</td>
		</tr>
        <tr>
           <td>CT-17 - Deletar um endereço cadastrado </td>
			<td>RF-002 - Permitir ao usuário que cadastre, altere ou delete seus endereços.</td>
			<td>Garantir que o usuário consiga deletar o endereços cadastrado </td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Na página de perfil o usuário deve visualizar e clicar no nome do endereço do formuário de endereços. </li>
					<li>Após clicar no nome do endereço cadastrado o sistema deve carregar as informações daquele endereço e substituir o botão salvar pelo botão de deletar.</li>
					<li>Após Clicar no botão de deletar com o endereço selecionado, o sistema deve apagar aquele endereço do banco de dados.</li>
				</ol>
			</td>
			<td>O sistema deve deletar um endereço selecionado do banco de dados.</td>
        </tr>
         <tr>
           <td>CT-18 - Alterar um endereço cadastrado </td>
			<td>RF-002 - Permitir ao usuário que cadastre ou altere ou delete seus endereços.</td>
			<td>Garantir que o usuário consiga alterar o endereços cadastrado </td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Na página de perfil o usuário deve visualizar e clicar no nome do endereço do formuário de endereços. </li>
                    <li>O usuário deve alterar um campo do formulário de endereço que desejar.</li>
					<li>Após clicar no nome do endereço cadastrado o sistema deve carregar as informações daquele endereço e substituir o botão salvar pelo botão de deletar e Alterar.</li>
					<li>Após Clicar no botão de Alterar com o endereço selecionado, o sistema deve modificar aquele endereço do banco de dados com os novos dados preenchidos.</li>
				</ol>
			</td>
			<td>O sistema deve modificar um endereço selecionado no banco de dados.</td>
        </tr>
        <tr>
            <td>CT-19 - adicionar uma foto de perfil do usuário.</td>
			<td>RF-004 Permitir ao usuário adicionar, alterar ou excluir uma foto de perfil do usuário.</td>
			<td>Garantir que o usuário consiga adicionar uma foto de perfil</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Na página de perfil o usuário deve visualizar e clicar no botão de selecionar imagem </li>
					<li>O usuário deve selecionar um arquivo no formato de imagem (png, jpg...)</li>
					<li>Após selecionar a imagem o sistema deve preencher o campo de seleção de arquivo com o nome do arquivo selecionado, o usuário deve clicar em salvar.</li>
                    <li>Após clicar em salvar o usuário deve retornar a página de perfil e visualizar a foto que foi adicionada</li>
				</ol>
			</td>
			<td>O sistema deve adicionar um arquivo de imagem na foto de perfil do usuário.</td>
        </tr>
        <tr>
            <td>CT-20 - Alterar a foto de perfil do usuário.</td>
			<td>RF-004 Permitir ao usuário adicionar, alterar ou excluir uma foto de perfil do usuário.</td>
			<td>Garantir que o usuário consiga trocar a foto de perfil</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Na página de perfil o usuário deve visualizar e clicar no botão de selecionar imagem </li>
					<li>O usuário deve selecionar um arquivo no formato de imagem (png, jpg...)</li>
					<li>Após selecionar a imagem o sistema deve preencher o campo de seleção de arquivo com o nome do arquivo selecionado, o usuário deve clicar em salvar.</li>
                    <li>Após clicar em salvar o usuário deve retornar a página de perfil e visualizar a foto que foi alterada.</li>
				</ol>
			</td>
			<td>O sistema deve alterar um arquivo de imagem na foto de perfil do usuário.</td>
        </tr>
        <tr>
            <td>CT-21 - Deletar a foto de perfil do usuário.</td>
			<td>RF-004 Permitir ao usuário adicionar, alterar ou excluir uma foto de perfil do usuário.</td>
			<td>Garantir que o usuário consiga excluir a foto de perfil</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Na página de perfil o usuário deve visualizar e clicar no botão de deletar imagem. </li>
					<li>O usuário deve clicar em sim na mensagem de confirmação para exclusão do arquivo.</li>
					<li>Após clicar em sim o sistema deve deletar a foto atual de perfil do usuário.</li>
                    <li>Após deletar a imagem o sistema deve exibir a mensagem 'image not found' no local da imagem.</li>
				</ol>
			</td>
			<td>O sistema deve deletar a imagem na foto de perfil do usuário.</td>
        </tr>
        <tr>
            <td>CT-22 - Alterar o nome do usuário.</td>
			<td>RF-006 - Permitir ao usuário alterar sua informações pessoais</td>
			<td>Garantir que o usuário consiga alterar o nome que foi cadastrado.</td>
			<td>
				<ol>
					<li>Considerando um usuário devidamente logado.</li>
					<li>Na página de perfil o usuário deve substituir o nome no formulário de perfil. </li>
					<li>O usuário deve clicar em salvar alterações para salvar o novo nome que foi inserido</li>
					<li>Após clicar o sistema deve mostrar o novo nome que foi escolhido.</li>            
				</ol>
			</td>
			<td>O sistema deve alterar o nome do usuário.</td>
        </tr>
	</tbody>
</table>

# Plano de Testes de Sistema

## Plano de Testes de Seguraça em Transações.
#### Responsável: Vitor Alexandre

Este teste consiste em verificar se o sistema tem a capacidade de garantir a integridade de uma transação.

<table>
	<thead>
		<tr>
			<th>Casos de Teste</th>
			<th>Requisitos Associados</th>
			<th>Objetivo do Teste</th>
			<th>Passos</th>
			<th>Critérios de Êxito</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>CTU-01</td>
			<td>RNF-006 - O sistema deve garantir a segurança das transações permitindo apenas ao dono do produto a confirmação do processo</td>
			<td>Garantir que o apenas o usuário dono do livro consiga finalizar a transação</td>
			<td>
				<ol>
					<li>Deve se realizar o cadastro do proprietário</li>
					<li>Deve se realizar o cadastro do comprador</li>
					<li>O proprietario deve cadastrar o endereço</li>
					<li>O proprietario deve cadastrar o livro a ser negociado</li>
					<li>O comprador deve solicitar o inicio da transação</li>
					<li>Apos o comprador tentar finalizar a transação o sistema emitirá um erro</li>
					<li>A transação será concluida quando o proprietário finaliza-la</li>
				</ol>
			</td>
			<td>O sistema deve emitir uma mensagem confirmando o procedimento.</td>
		</tr>
	</tbody>
</table>
    
