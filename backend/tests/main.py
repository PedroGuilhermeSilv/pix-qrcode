import crcmod
import qrcode


def calcular_crc16(payload):
    crc16_func = crcmod.mkCrcFun(0x11021, initCrc=0xFFFF, rev=False, xorOut=0x0000)
    crc = hex(crc16_func(payload.encode('utf-8'))).upper()[2:]
    return crc.zfill(4)


def gerar_payload_pix(chave_pix, valor, nome_recebedor, cidade_recebedor):
 
    payload_format_indicator = "000201"
    point_of_initiation_method = "010212" 
    merchant_account_information = f"0014BR.GOV.BCB.PIX01{len(chave_pix):02d}{chave_pix}"
    merchant_account_information_length = f"26{len(merchant_account_information):02d}"
    merchant_category_code = "52040000"  
    transaction_currency = "5303986" 
    transaction_amount = f"54{len(valor):02d}{valor}"  
    country_code = "5802BR"
    merchant_name = f"59{len(nome_recebedor):02d}{nome_recebedor}"
    merchant_city = f"60{len(cidade_recebedor):02d}{cidade_recebedor}"
    additional_data_field_template = "62070503***"
    crc_placeholder = "6304"

    br_code = (
        payload_format_indicator +
        point_of_initiation_method +
        merchant_account_information_length +
        merchant_account_information +
        merchant_category_code +
        transaction_currency +
        transaction_amount +
        country_code +
        merchant_name +
        merchant_city +
        additional_data_field_template +
        crc_placeholder
    )


    crc_value = calcular_crc16(br_code)
    

    return br_code + crc_value


def gerar_qrcode_pix(payload, nome_arquivo="qrcode_pix.png"):
    print(f"Gerando QR Code para o payload: {payload}")
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(payload)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')
    img.save(nome_arquivo) 


chave_pix = "05412792383"
valor = "1.00" 
nome_recebedor = "N"
cidade_recebedor = "C"  

payload = gerar_payload_pix(chave_pix, valor, nome_recebedor, cidade_recebedor)
gerar_qrcode_pix(payload)