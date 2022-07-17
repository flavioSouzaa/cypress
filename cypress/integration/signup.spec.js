import signupPage from '../page/SignupPage'
import signupFactory from '../factories/SignupFactory'


describe('Signup', () => {
    // Utilizado para pular o teste
    //it.skip
    var deliver = signupFactory.deliver()

    beforeEach(function () {
        //signupPage.go()

        // cy.fixture('deliver').then((d) => {
        //     this.deliver = d
        // })
    })

  

    it('User should be deliver', function () {
        signupPage.go()        
        signupPage.fillForm(deliver)
        signupPage.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {
        signupPage.go()
        
        deliver.cpf = '000012300AA'
       
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShoultdBe('Oops! CPF inválido')
    })

    it('Incorrect Email', function () {
        signupPage.go()

        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShoultdBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShoultdBe(msg.output)
            })
        })

    })
})