<PrimaryButton label="Confirmar" onClick={() => {}} />

        <View style={{ height: 10 }} />
        <SecondaryButton
          label="Pesquisar"
          onClick={() => {
            console.log("click");
          }}
        />

        <View style={{ height: 10 }} />
        <DestructiveButton label="Cancelar" onClick={() => {}} />

        <View style={{ height: 10 }} />
        <Input label="Nome" />

        <View style={{ height: 10 }} />
        <Dropdown placeholder="Ordenar por" items={items}>
          {(value) => <Text>{value.title}</Text>}
        </Dropdown>

        <View style={{ height: 10 }} />
        <TextArea placeholder="Texto" />

        <View style={{ height: 10 }} />
        <ComposedButton
          title="Localização"
          subtitle="(Meu endereço)"
          onClick={() => {}}
        />

        <View style={{ height: 10 }} />
        <SearchInput placeholder="Pesquisar por livro" />

        <View style={{ height: 10 }} />
        <Separator label="ou" />

        <View style={{ height: 10 }} />
        <CheckedLabel label="Disponível para aluguel" />
