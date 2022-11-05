use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instructions: &[u8],
) -> ProgramResult {
    let key = instructions.first().unwrap();
    match key {
        0 => msg!("zero"),
        1 => msg!("one"),
        2 => msg!("two"),
        _ => msg!("panic {}", key),
    }
    msg!(
        "program_id {} \n
        accounts {}\n
        data {:?}",
        program_id,
        accounts.len(),
        instructions
    );
    Ok(())
}
