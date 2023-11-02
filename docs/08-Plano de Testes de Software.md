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
            <tr>
                <td>9. Teste do tratamento de erro na submissão</td>
                <td>RF-001</td>
                <td>Verificar se o tratamento de erro ao falhar na submissão real é adequado.</td>
                <td>
                    <ol>
                        <li>Preencha os campos corretamente, mas simule uma falha na submissão.</li>
                        <li>Clique no botão "Continuar".</li>
                    </ol>
                </td>
                <td>O tratamento de erro é adequado e fornece feedback ao usuário.</td>
            </tr>
            <tr>
                <td>10. Teste da orientação da interface do usuário</td>
                <td>RNF-001</td>
                <td>Verificar se a interface do usuário se ajusta à orientação corretamente.</td>
                <td>
                    <ol>
                        <li>Gire o dispositivo para a orientação paisagem.</li>
                        <li>Verifique se a interface se ajusta corretamente.</li>
                        <li>Gire o dispositivo para a orientação retrato.</li>
                        <li>Verifique se a interface se ajusta corretamente.</li>
                    </ol>
                </td>
                <td>A interface do usuário se ajusta à orientação corretamente.</td>
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
            <tr>
                <td>7. Teste do tratamento de erro na submissão</td>
                <td>RF-003</td>
                <td>Verificar se o tratamento de erro ao falhar na submissão real é adequado.</td>
                <td>
                    <ol>
                        <li>Preencha os campos corretamente, mas simule uma falha na submissão.</li>
                        <li>Clique no botão "Entrar".</li>
                    </ol>
                </td>
                <td>O tratamento de erro é adequado e fornece feedback ao usuário.</td>
            </tr>
            <tr>
                <td>8. Teste da orientação da interface do usuário</td>
                <td>RNF-001</td>
                <td>Verificar se a interface do usuário se ajusta à orientação corretamente.</td>
                <td>
                    <ol>
                        <li>Gire o dispositivo para a orientação paisagem.</li>
                        <li>Verifique se a interface se ajusta corretamente.</li>
                        <li>Gire o dispositivo para a orientação retrato.</li>
                        <li>Verifique se a interface se ajusta corretamente.</li>
                    </ol>
                </td>
                <td>A interface do usuário se ajusta à orientação corretamente.</td>
            </tr>
        </tbody>
    </table>


## CT-03 Listar os anúncios

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
			<td>RF-016 - Listar ao usuário seus livros em negociação</td>
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
